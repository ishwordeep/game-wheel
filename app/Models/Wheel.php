<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wheel extends Model
{
    use HasFactory;

    protected $fillable = [
        "win_ratio",
        "value",
        "display_name"
    ];

    public function spinRecords()
    {
        return $this->hasMany(SpinRecord::class);
    }

    public function customWinRecords()
    {
        return $this->hasMany(CustomWinRecord::class);
    }
}
