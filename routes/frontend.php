<?php

use App\Http\Controllers\Frontend\SettingController;
use Illuminate\Support\Facades\Route;



Route::controller(SettingController::class)->group(function () {
    Route::get('/setting', 'index');
});
