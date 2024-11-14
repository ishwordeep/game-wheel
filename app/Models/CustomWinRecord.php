<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomWinRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'wheel_id',
        'value',
        'is_applied',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function wheel(){
        return $this->belongsTo(Wheel::class);
    }
}
