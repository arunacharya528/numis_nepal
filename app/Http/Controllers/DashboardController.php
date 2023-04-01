<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = (object)[
            'product_count'=>Product::count(),
            'category_count'=>Category::count()
        ];

        return view('pages.admin.dashboard',compact('data'));
    }
}
