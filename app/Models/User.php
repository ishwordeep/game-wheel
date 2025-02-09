<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'username',
        'password',
        'role',
        'image',
        'is_active',
        'total_balance'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];
    public function spinRecords()
    {
        return $this->hasMany(SpinRecord::class);
    }

    public function customWinRecords()
    {
        return $this->hasMany(CustomWinRecord::class);
    }

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    protected static function boot()
    {
        parent::boot();

        // Event to handle image deletion when a profile picture is updated
        static::updating(function ($user) {
            if ($user->isDirty('image')) {
                // Check if the old image exists and is not null
                $oldImage = $user->getOriginal('image');
                if ($oldImage) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
        });

        // Event to handle image deletion when the user is deleted
        static::deleting(function ($user) {
            // Delete the user's profile image when the user is deleted
            if ($user->image) {
                Storage::disk('public')->delete($user->image);
            }
        });
    }
}
