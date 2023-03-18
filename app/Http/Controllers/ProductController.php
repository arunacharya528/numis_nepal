<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\Theme;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = Category::select('id', 'name')->pluck('name', 'id');

        $themes = Theme::pluck('title', 'id');

        $products = Product::with('themes')->when(
            $request->has('filter'),
            function ($q) use ($request) {

                $isName = $request->has('name') && !is_null($request->input('name'));
                $isTheme = $request->has('themes') && !is_null($request->input('themes'));

                if ($isName) {
                    $q->where('name', "LIKE", "%" . $request->name . "%");
                }

                if ($isTheme) {
                    $q->whereHas(
                        'themes',
                        function ($q) use ($request) {
                            $q->where(function ($q) use ($request) {
                                foreach ($request->themes as $value) {
                                    $q->orWhere('themes.id', $value);
                                }
                            });
                        }
                    );
                }

                $filteringColumns = ['category_id', 'quality'];

                foreach ($filteringColumns as $column) {
                    $input = $request->input($column, '');
                    if ($request->has($column) && $input != '') {
                        $q->where($column, $request->input($column));
                    }
                }
            }
        )->latest()->paginate();

        return view('pages.admin.product.index', compact('products', 'categories', 'themes'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $themes = Theme::pluck('title', 'id');

        $categories = Category::select('id', 'name')->pluck('name', 'id');

        return view('pages.admin.product.create', compact('themes', 'categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        DB::transaction(function () use ($request) {

            $product = Product::create($request->all());

            $this->saveTheme($product, $this->getTheme($request));
        });

        return redirect()->route('admin.products.index')->with('success', 'Successfully created product');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $themes = Theme::pluck('title', 'id');

        $categories = Category::select('id', 'name')->pluck('name', 'id');

        return view('pages.admin.product.edit', compact('product', 'themes', 'categories'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreProductRequest $request, Product $product)
    {
        DB::transaction(function () use ($request, $product) {

            $product->update($request->all());

            $this->saveTheme($product, $this->getTheme($request));
        });

        return redirect()->route('admin.products.index')->with('success', 'Successfully updated product');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index')->with('success', 'Successfully deleted product');
    }

    public function getTheme(Request $request)
    {
        $existingThemes = collect($request->themes)->filter(function ($value) {
            return ctype_digit($value);
        });

        $newThemes = collect($request->themes)->diff($existingThemes);

        return (object)compact('existingThemes', 'newThemes');
    }

    public function saveTheme(Product $product, Object $theme)
    {
        $product->themes()->sync($theme->existingThemes);

        foreach ($theme->newThemes as $theme) {

            $theme = $product->themes()->firstOrCreate([
                'title' => $theme
            ]);

            $product->productTheme()->firstOrCreate([
                'product_id' => $product->id,
                'theme_id' => $theme->id
            ]);
        }
    }
}
