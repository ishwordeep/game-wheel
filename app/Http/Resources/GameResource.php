<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
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
            "name" => $this->name,
            "agent_link" => $this->agent_link,
            "player_link" => $this->player_link,
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
