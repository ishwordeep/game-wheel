<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpinRecordResource;
use App\Http\Resources\UserBalanceResource;
use App\Models\SpinRecord;
use App\Models\UserBalance;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PlayerController extends Controller
{
    public function spinRecordsByUser(Request $request)
    {
        try {
            $user = $request->user();
            // $spinRecords = $user->spinRecords()->with('wheel')->get();
            $spinRecordsQuery = $user->spinRecords()->with('wheel');
            if ($request->has('start_date') && $request->has('end_date')) {
                $startDate = Carbon::parse($request->input('start_date'))->startOfDay();
                $endDate = Carbon::parse($request->input('end_date'))->endOfDay();
                $spinRecordsQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($request->has('start_date')) {
                $date = Carbon::parse($request->input('start_date'));
                $spinRecordsQuery->whereDate('created_at', $date);
            } elseif ($request->has('end_date')) {
                $date = Carbon::parse($request->input('end_date'));
                $spinRecordsQuery->whereDate('created_at', $date);
            }

            $spinRecords = $spinRecordsQuery->get();
            $request = request();
            $request->merge(['exclude_win_ratio' => true]);
            return apiResponse([
                'success' => true,
                'message' => 'Spin records retrieved successfully',
                'data' => [
                    'count' => $spinRecords->count(),
                    'rows' => SpinRecordResource::collection($spinRecords),
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'success' => false,
                'message' => $e->getMessage(),
                'error' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }

    public function userBalanceHistory(Request $request, $type)
    {
        try {
            $user = $request->user();

            // Start building the query for redemptions
            $balanceHistoryQuery = UserBalance::where('user_id', $user->id);

            // Apply condition based on route type
            if ($type === 'win') {
                $balanceHistoryQuery->whereNotNull('spin_record_id');
            } elseif ($type === 'redeem') {
                $balanceHistoryQuery->whereNull('spin_record_id');
            } else {
                return apiResponse([
                    'success' => false,
                    'message' => 'Invalid type specified',
                    'statusCode' => Response::HTTP_BAD_REQUEST
                ]);
            }

            if ($request->has('start_date') && $request->has('end_date')) {
                $startDate = Carbon::parse($request->input('start_date'))->startOfDay();
                $endDate = Carbon::parse($request->input('end_date'))->endOfDay();
                $balanceHistoryQuery->whereBetween('created_at', [$startDate, $endDate]);
            } elseif ($request->has('start_date')) {
                $date = Carbon::parse($request->input('start_date'));
                $balanceHistoryQuery->whereDate('created_at', $date);
            } elseif ($request->has('end_date')) {
                $date = Carbon::parse($request->input('end_date'));
                $balanceHistoryQuery->whereDate('created_at', $date);
            }
    
            $balanceHistory = $balanceHistoryQuery->get();

            return apiResponse([
                'success' => true,
                'message' => 'Redemption history retrieved successfully',
                'data' => [
                    'count' => $balanceHistory->count(),
                    'rows' => UserBalanceResource::collection($balanceHistory),
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'success' => false,
                'message' => $e->getMessage(),
                'error' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }
}
