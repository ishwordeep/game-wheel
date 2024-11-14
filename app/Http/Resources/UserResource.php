<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'is_active' => $this->is_active,
            'total_balance' => $this->total_balance,
        ];
        if($this->image){
            $data['image'] = asset('storage/'.$this->image);
        }

        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });
        return $data;
    }
}
