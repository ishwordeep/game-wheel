<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class SettingController extends Controller
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

            $query = Setting::query();

            // Apply keyword filtering if provided
            if ($request->filled('keyword')) {
                $keyword = $request->input('keyword');
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'like', '%' . $keyword . '%');
                });
            }

            // Apply sorting
            $query->orderBy($sortBy, $sortOrder);

            // Paginate the results
            $items = $query->paginate($perPage);

            return apiResponse([
                'status' => true,
                'message' => 'Setting retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => SettingResource::collection($items),
                    'pagination' =>  $items->count() > 0 ? paginate($items) : null
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving setting',
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
                'name' => $request->name,
                'spin_frequency' => $request->spin_frequency,
            ];

            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'settings');
            }

            $item = Setting::create($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'setting created successfully',
                'data' => new SettingResource($item),
                'statusCode' => Response::HTTP_CREATED,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'setting creation failed',
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
            $item = Setting::findOrFail($id);

            return apiResponse([
                'status' => true,
                'message' => 'Setting retrieved successfully',
                'data' => new SettingResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            return apiResponse([
                'status' => false,
                'message' => 'Setting not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving the setting',
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
            $item = Setting::findOrFail($id);

            $data = $request->only(['name', 'spin_frequency']);



            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'settings'); // Update with new image
            } elseif ($request->filled('deleted_image')) {
                $data['image'] = null; // Remove the image
            } else {
                $data['image'] = $item->image; // Keep the existing image
            }

            $item->update($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Setting updated successfully',
                'data' => new SettingResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Setting not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while updating the setting',
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
            $item = Setting::findOrFail($id);

            $item->delete();
            DB::commit();

            // Return success response
            return apiResponse([
                'status' => true,
                'message' => 'Setting deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            // If setting not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'Setting not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            // For any other exception, return internal server error
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while deleting the setting',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
}
