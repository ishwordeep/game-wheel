<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WheelResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data= [
            "id" => $this->id,
            "value" => $this->value,
            "win_ratio" => $request->has('exclude_win_ratio') ? null : $this->win_ratio,
        ];
        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });
        return $data;
    }
}
