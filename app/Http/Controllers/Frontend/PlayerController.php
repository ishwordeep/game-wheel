<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\SpinRecordResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PlayerController extends Controller
{
    public function spinRecordsByUser(Request $request)
    {
        try {
            $user = $request->user();
            $spinRecords = $user->spinRecords()->with('wheel')->get();
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
}
