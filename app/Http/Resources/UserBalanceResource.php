<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserBalanceResource extends JsonResource
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
            "amount" => $this->value,
        ];
        if($this->spin_record_id){
            $data['spin'] = new SpinRecordResource($this->spinRecord);
        }
        $data = array_filter($data, function ($value) {
            return !is_null($value);
        });
        return $data;
    }
}
