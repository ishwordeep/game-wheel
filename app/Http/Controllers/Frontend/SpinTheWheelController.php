<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Models\SpinRecord;
use App\Models\UserBalance;
use App\Models\Wheel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class SpinTheWheelController extends Controller
{
    // value,spin_record_id,wheel_id

    public function index(Request $request)
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();
            // $wheel_id = $request->wheel_id;
            $value = $request->value;

            if ($user->role != 'player') {
                return apiResponse([
                    'status' => false,
                    'message' => 'Only players can spin the wheel',
                    'statusCode' => Response::HTTP_FORBIDDEN,
                ]);
            }

            // check spin_frequency
            $nextSpinTime = $this->validateSpinRequest();
            if ($nextSpinTime) {
                return apiResponse([
                    'status' => false,
                    'message' => 'You can spin the wheel again after ' . $nextSpinTime['time_remaining'],
                    'data' => [
                        'next_allowed_spin_time' => $nextSpinTime['next_allowed_spin_time'],
                        'time_remaining' => $nextSpinTime['time_remaining'],
                    ],
                    'statusCode' => Response::HTTP_FORBIDDEN,
                ]);
            }

            $customWinRecords = auth()->user()->customWinRecords()->where('is_applied', false)->first();
            if ($customWinRecords) {
                $customWinRecords->update([
                    'is_applied' => true,
                ]);
            }



            $spinRecord = SpinRecord::create([
                // 'wheel_id' => $wheel_id,
                'user_id' => $user->id,
                'value' => $value,
            ]);

            $userBalance = UserBalance::create([
                'spin_record_id' => $spinRecord->id,
                'user_id' => $user->id,
                'value' => $value,
            ]);

            $totalBalance = $user->balance + $value;
            $user->update([
                'total_balance' => $totalBalance,
            ]);

            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Spinning data stored successfully',
                'data' => [
                    'win_value' => $value,
                    'user_balance' => $userBalance,
                ],
                'statusCode' => Response::HTTP_OK,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while storing spinning data',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    public function validateSpinRequest()
    {
        $user = auth()->user();
        $setting = Setting::first();
        $spinFrequency = $setting->spin_frequency;

        $lastSpin = SpinRecord::where('user_id', $user->id)->latest()->first();

        // If no previous spin exists, no validation needed
        if (!$lastSpin) {
            return;
        }

        $lastSpinDateTime = $lastSpin->created_at;

        // Calculate next allowed spin time
        $nextAllowedSpinTime = $lastSpinDateTime->addHours($spinFrequency);

        // Check if the current time is before the next allowed spin time
        if (now()->lessThan($nextAllowedSpinTime)) {
            $timeRemaining = $nextAllowedSpinTime->diffForHumans([
                'parts' => 2, // Limit to 2 time parts, e.g., "1 hour and 15 minutes"
                'short' => true, // Use shorter format if preferred
            ]);

            return [
                'next_allowed_spin_time' => $nextAllowedSpinTime->format('Y-m-d H:i:s'),
                'time_remaining' => $timeRemaining,
            ];
        }
        return;
    }

    public function spinWinningValue()
    {

        $customWinRecords = auth()->user()->customWinRecords()->where('is_applied', false)->first();
        if (!$customWinRecords) {
            $winningValue = $this->calculateWinNumber();
            return $winningValue;
        }
        return $customWinRecords->value;
    }

    private function calculateWinNumber()
    {
        $wheels = Wheel::get();
        $totalWinRatio = $wheels->sum('win_ratio');
        $randomNumber = mt_rand(1, $totalWinRatio * 100) / 100;//0.2
        $currentRatio = 0;
        $choice = null;
        foreach ($wheels as $wheel) {
            $currentRatio += $wheel->win_ratio;
            if ($randomNumber <= $currentRatio) {
                $choice = $wheel->value;
                break;
            }
        }
        return $choice;
    }
}
