<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderItemController;
use App\Http\Controllers\OrderStatusController;
use App\Http\Controllers\ProductController;
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

    Route::group(['prefix' => "product-management"], function () {
        Route::resource('products', ProductController::class);
        Route::resource('categories', CategoryController::class);
    });

    Route::group(['prefix' => "order-management"], function () {
        Route::get("orders/{order}/download", [OrderController::class, 'download'])->name('orders.download');
        Route::post("orders/{order}/reduce", [OrderController::class, 'reduce'])->name('orders.reduce');
        Route::post("orders/{order}/retain", [OrderController::class, 'retain'])->name('orders.retain');
        Route::resource('orders', OrderController::class);
        Route::resource('order-status', OrderStatusController::class);
        Route::resource('order-item', OrderItemController::class);
    });

    ROute::post("logout", [AuthController::class, 'logout'])->name('logout');
});
