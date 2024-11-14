<?php

use App\Http\Controllers\Admin\CustomWinRecordController;
use App\Http\Controllers\Admin\GameController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\SliderController;
use App\Http\Controllers\Admin\SpinRecordController;
use App\Http\Controllers\Admin\WheelController;
use App\Http\Controllers\Admin\WheelRuleController;
use App\Http\Controllers\API\Admin\SwitchActiveStatusController;
use App\Http\Controllers\Auth\ProfileController;
use App\Http\Middleware\CheckSuperadmin;
use App\Http\Middleware\CheckSuperadminOrAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;




//Protected API Routes
// Route::middleware(['auth:sanctum', 'verified'])->group(function () {
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(ProfileController::class)->group(function () {
        Route::get('/user', 'user');
        Route::post('/profile-update', 'profileUpdate');
        Route::post('/change-password',  'changePassword');
        Route::post('update-profile-picture', 'updateProfilePicture');
    });

    Route::get('/auth-test', function (Request $request) {
        return response()->json([
            'success' => true,
            'message' => 'Protected API is working fine'
        ]);
    });

    Route::middleware([CheckSuperadmin::class])->group(function () {
        Route::get('users-list', [ProfileController::class, 'usersList']);
    });


    // Super Admin & Admin Accessible Routes 
    Route::middleware([CheckSuperadminOrAdmin::class])->group(function () {

        Route::controller(GameController::class)->group(function () {
            Route::post('/game', 'store');
            Route::get('/game', 'index');
            Route::get('/game/{id}', 'show');
            Route::post('/game/{id}', 'update');
            Route::delete('/game/{id}', 'destroy');
        });

        // payment
        Route::controller(PaymentController::class)->group(function () {
            Route::post('/payment', 'store');
            Route::get('/payment', 'index');
            Route::get('/payment/{id}', 'show');
            Route::post('/payment/{id}', 'update');
            Route::delete('/payment/{id}', 'destroy');
        });

        // setting
        Route::controller(SettingController::class)->group(function () {
            Route::post('/setting', 'store');
            Route::get('/setting', 'index');
            Route::get('/setting/{id}', 'show');
            Route::post('/setting/{id}', 'update');
            Route::delete('/setting/{id}', 'destroy');
        });

        //slider
        Route::controller(SliderController::class)->group(function () {
            Route::post('/slider', 'store');
            Route::get('/slider', 'index');
            Route::get('/slider/{id}', 'show');
            Route::post('/slider/{id}', 'update');
            Route::delete('/slider/{id}', 'destroy');
        });

        // rule
        Route::controller(WheelRuleController::class)->group(function () {
            Route::post('/rule', 'store');
            Route::get('/rule', 'index');
            Route::get('/rule/{id}', 'show');
            Route::post('/rule/{id}', 'update');
            Route::delete('/rule/{id}', 'destroy');
        });

        // wheel
        Route::controller(WheelController::class)->group(function () {
            Route::post('/wheel', 'store');
            Route::get('/wheel', 'index');
            Route::get('/wheel/{id}', 'show');
            Route::post('/wheel/{id}', 'update');
            Route::delete('/wheel/{id}', 'destroy');
        });

        Route::controller(SpinRecordController::class)->group(function () {
            Route::get('/spin-record', 'index');
        });

        Route::controller(CustomWinRecordController::class)->group(function () {
            Route::post('/custom-win-record', 'store');
            Route::get('/custom-win-record', 'index');
            Route::get('/custom-win-record/{id}', 'show');
            Route::post('/custom-win-record/{id}', 'update');
            Route::delete('/custom-win-record/{id}', 'destroy');
        });

        Route::post('/toggle-status/{modelName}/{id}', [SwitchActiveStatusController::class, 'toggleStatus']);
    });
});



//Public API Routes

Route::get('/test', function (Request $request) {
    return response()->json([
        'success' => true,
        'message' => 'API is working fine'
    ]);
});



require __DIR__ . '/auth.php';
