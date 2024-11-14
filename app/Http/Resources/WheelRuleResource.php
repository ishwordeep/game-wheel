<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WheelRuleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data= [
            "id"=> $this->id,
            "title"=> $this->title,
            "description"=> $this->description,
        ];
        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });
        return $data;
    }
}
