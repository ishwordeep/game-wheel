<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SliderResource extends JsonResource
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
            "title" => $this->name,
            "subtitle" => $this->subtitle,
            "display_order" => $this->display_order,
        ];

        if ($this->image) {
            $data['image'] = asset('storage/' . $this->image);
        }
        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });
        return $data;
    }
}
