<?php

use App\Http\Controllers\Frontend\GameController;
use App\Http\Controllers\Frontend\PaymentController;
use App\Http\Controllers\Frontend\PlayerController;
use App\Http\Controllers\Frontend\SettingController;
use App\Http\Controllers\Frontend\SliderController;
use App\Http\Controllers\Frontend\SpinTheWheelController;
use App\Http\Controllers\Frontend\WheelController;
use App\Http\Controllers\Frontend\WheelRuleController;
use Illuminate\Support\Facades\Route;



Route::controller(SettingController::class)->group(function () {
    Route::get('/setting', 'index');
});

Route::controller(GameController::class)->group(function () {
    Route::get('game', 'index');
});

Route::controller(PaymentController::class)->group(function () {
    Route::get('payment', 'index');
});

// sliders
Route::controller(SliderController::class)->group(function () {
    Route::get('slider', 'index');
});
Route::controller(WheelRuleController::class)->group(function () {
    Route::get('wheel-rules', 'index');
});
Route::controller(WheelController::class)->group(function () {
    Route::get('wheel-values', 'index');
});

Route::middleware(['auth:sanctum'])->controller(PlayerController::class)->group(function () {
    Route::get('spin-records', 'spinRecordsByUser');
    Route::get('player-balance-history/{type}', 'userBalanceHistory');
    Route::post('spin-the-wheel', 'index');
});
Route::middleware(['auth:sanctum'])->controller(SpinTheWheelController::class)->group(function () {

    Route::post('spin-the-wheel', 'index');
    Route::get('next-spin-time', 'validateSpinRequest');

});

