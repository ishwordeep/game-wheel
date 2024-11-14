<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CustomWinRecordResource;
use App\Models\CustomWinRecord;
use App\Models\Wheel;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CustomWinRecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $sortBy = $request->input('sort_by', 'created_at');
            $sortOrder = $request->input('sort_order', 'desc');

            $query = CustomWinRecord::query();



            // Apply sorting
            $query->orderBy($sortBy, $sortOrder);

            // Paginate the results
            $items = $query->paginate($perPage);

            return apiResponse([
                'status' => true,
                'message' => 'CustomWinRecords retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => CustomWinRecordResource::collection($items),
                    'pagination' =>  $items->count() > 0 ? paginate($items) : null
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving customWinRecords',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = [
                'user_id' => $request->user_id,
                'wheel_id' => $request->wheel_id,
                'is_applied' => $request->is_applied ?? false,
            ];
            $data['value'] = Wheel::find($data['wheel_id'])->value;

            $item = CustomWinRecord::create($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'CustomWinRecord created successfully',
                'data' => new CustomWinRecordResource($item),
                'statusCode' => Response::HTTP_CREATED,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'CustomWinRecord creation failed',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $item = CustomWinRecord::findOrFail($id);

            return apiResponse([
                'status' => true,
                'message' => 'CustomWinRecord retrieved successfully',
                'data' => new CustomWinRecordResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            return apiResponse([
                'status' => false,
                'message' => 'CustomWinRecord not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving the customWinRecord',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $item = CustomWinRecord::findOrFail($id);

            $data = $request->only(['wheel_id', 'user_id', 'is_applied']);

            if($request->has('wheel_id')){
                $data['value'] = Wheel::find($data['wheel_id'])->value;
            }


            $item->update($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'CustomWinRecord updated successfully',
                'data' => new CustomWinRecordResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'CustomWinRecord not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while updating the CustomWinRecord',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $item = CustomWinRecord::findOrFail($id);

            $item->delete();
            DB::commit();

            // Return success response
            return apiResponse([
                'status' => true,
                'message' => 'CustomWinRecord deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            // If wheel not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'CustomWinRecord not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            // For any other exception, return internal server error
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while deleting the CustomWinRecord',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
}
