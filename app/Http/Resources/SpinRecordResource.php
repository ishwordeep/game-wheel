<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpinRecordResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            "id" => $this->id,
            // "wheel" => new WheelResource($this->wheel),
            "value" => $this->value,
            'spin_date' => $this->created_at ? $this->created_at->format('Y-m-d') : null,
            'spin_time' => $this->created_at ? $this->created_at->format('H:i:s') : null,
        ];
        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });
        return $data;
    }
}
