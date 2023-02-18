<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::view("", 'pages.login')->name('home');
Route::post("login", [AuthController::class, 'login'])->name('login');

Route::group(['middleware' => 'auth', 'as' => 'admin.', 'prefix' => 'admin'], function () {

    Route::view('dashboard', 'pages.admin.dashboard')->name('dashboard');

    ROute::post("logout", [AuthController::class, 'logout'])->name('logout');
});
