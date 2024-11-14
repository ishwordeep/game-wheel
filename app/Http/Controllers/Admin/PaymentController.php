<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\PaymentResource;
use App\Models\Payment;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $perPage = $request->input("per_page", 10);
            $sortBy = $request->input("sort_by", "display_order");
            $sortOrder = $request->input("sort-order", "desc");

            $query = Payment::query();

            if ($request->filled("keyword")) {
                $keyword = $request->input("keyword");
                $query->where(function ($q) use ($keyword) {
                    $q->where("name", "like", "%" . $keyword . "%");
                });
            }

            $query->orderBy($sortBy, $sortOrder);

            $items = $query->paginate($perPage);

            return apiResponse([
                "status" => true,
                "message" => "Payments retrieved successfully",
                "data" => [
                    "count" => $items->count(),
                    "rows" => PaymentResource::collection($items),
                    "pagination" => $items->count() > 0 ? paginate($items) : null
                ]
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                "status" => false,
                "message" => "An error occurred while retrieving payments",
                "errors" => $e->getMessage(),
                "statusCode" => Response::HTTP_INTERNAL_SERVER_ERROR
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
                "name" => $request->name,
            ];
            if ($request->hasFile("image")) {
                $data['image'] = storeImage($request->file('image'), 'payments');
            }

            $item = Payment::create($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Payment created successfully',
                'data' => new PaymentResource($item),
                'statusCode' => Response::HTTP_CREATED
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while creating payment',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $item = Payment::findOrFail($id);
            return apiResponse([
                'status' => true,
                'message' => 'Payment retrieved successfully',
                'data' => new PaymentResource($item)
            ]);
        } catch (ModelNotFoundException $e) {
            return apiResponse([
                'status' => false,
                'message' => 'Payment not found',
                'statusCode' => Response::HTTP_NOT_FOUND
            ]);
        } catch (\Exception $e) {
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while retrieving the payment',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR
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
            $item = Payment::findOrFail($id);
            $data = $request->only(["name"]);
            if ($request->hasFile('image')) {
                $data['image'] = storeImage($request->file('image'), 'payments'); // Update with new image
            } elseif ($request->filled('deleted_image')) {
                $data['image'] = null; // Remove the image
            } else {
                $data['image'] = $item->image; // Keep the existing image
            }
            $item->update($data);
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Payment updated successfully',
                'data' => new PaymentResource($item)
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Payment not found',
                'statusCode' => Response::HTTP_NOT_FOUND
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while updating the payment',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR
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
            $item = Payment::findOrFail($id);
            $item->delete();
            DB::commit();
            return apiResponse([
                'status' => true,
                'message' => 'Payment deleted successfully',
                'data' => new PaymentResource($item)
            ]);
        } catch (ModelNotFoundException $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'Payment not found',
                'statusCode' => Response::HTTP_NOT_FOUND
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return apiResponse([
                'status' => false,
                'message' => 'An error occurred while deleting the payment',
                'errors' => $e->getMessage(),
                'statusCode' => Response::HTTP_INTERNAL_SERVER_ERROR
            ]);
        }
    
    }
}
