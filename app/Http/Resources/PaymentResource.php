<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PaymentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data=[
            "id"=> $this->id,
            "name"=> $this->name,
        ];
        if($this->image){
            $data['image'] = asset('storage/'.$this->image);
        }
        return $data;
    }
}
