<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\SliderResource;
use App\Models\Slider;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input('per_page', 10);
            $sortBy = $request->input('sort_by', 'display_order');
            $sortOrder = $request->input('sort_order', 'desc');

            $query = Slider::query();

            // Apply keyword filtering if provided
            if ($request->filled('keyword')) {
                $keyword = $request->input('keyword');
                $query->where(function ($q) use ($keyword) {
                    $q->where('title', 'like', '%' . $keyword . '%');
                });
            }

            // Apply sorting
            $query->orderBy($sortBy, $sortOrder);

            // Paginate the results
            $items = $query->paginate($perPage);

            return apiResponse([
                'status' => true,
                'message' => 'Sliders retrieved successfully',
                'data' => [
                    'count' => $items->count(),
                    'rows' => SliderResource::collection($items),
                    'pagination' =>  $items->count() > 0 ? paginate($items) : null
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving sliders',
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
                'title' => $request->title,
                'subtitle' => $request->subtitle,
                'display_order' => $request->display_order ?? 0,
            ];

            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'sliders');
            }

            $item = Slider::create($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Slider created successfully',
                'data' => new SliderResource($item),
                'statusCode' => Response::HTTP_CREATED,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Slider creation failed',
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
            $item = Slider::findOrFail($id);

            return apiResponse([
                'status' => true,
                'message' => 'Slider retrieved successfully',
                'data' => new SliderResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            return apiResponse([
                'status' => false,
                'message' => 'Slider not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving the slider',
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
            $item = Slider::findOrFail($id);

            $data = $request->only(['title', 'subtitle', 'display_order']);

            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'sliders'); // Update with new image
            } elseif ($request->filled('deleted_image')) {
                $data['image'] = null; // Remove the image
            } else {
                $data['image'] = $item->image; // Keep the existing image
            }

            $item->update($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Slider updated successfully',
                'data' => new SliderResource($item),
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Slider not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while updating the slider',
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
            $item = Slider::findOrFail($id);

            $item->delete();
            DB::commit();

            // Return success response
            return apiResponse([
                'status' => true,
                'message' => 'Slider deleted successfully',
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            // If slider not found, return 404
            return apiResponse([
                'status' => false,
                'message' => 'Slider not found',
                'statusCode' => Response::HTTP_NOT_FOUND,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            // For any other exception, return internal server error
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while deleting the slider',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR,
            ]);
        }
    }
}
