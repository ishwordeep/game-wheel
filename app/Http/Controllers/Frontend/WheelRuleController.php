<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Resources\WheelRuleResource;
use App\Models\WheelRule;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class WheelRuleController extends Controller
{
    public function index(){
        try {
            $items = WheelRule::orderBy("display_order", "asc")->get();
            return apiResponse([
                'status' => true,
                'message' => 'wheel rules retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => WheelRuleResource::collection($items),
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving wheel rules',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
}
