<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\WheelResource;
use App\Models\Wheel;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WheelController extends Controller
{
    public function index()
    {
        try {
            $items = Wheel::get();
            $request = request();
            $request->merge(['exclude_win_ratio' => true]);
            return apiResponse([
                'status' => true,
                'message' => 'wheels retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => WheelResource::collection($items),
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving wheels',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
}
