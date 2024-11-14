<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SpinRecord extends Model
{
    use HasFactory;
    protected $fillable = [
        "wheel_id",
        "user_id",
        "value",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function wheel(){
        return $this->belongsTo(Wheel::class);
    }

}
