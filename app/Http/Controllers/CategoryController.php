<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request->has('map')) {
            $categories = Category::with('subCategories')->whereNull('parent_id')->latest()->get();
        } else {
            $categories = Category::latest()->get();
        }

        return view('pages.admin.category.index', compact('categories'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::pluck("name", 'id');

        return view('pages.admin.category.create', compact('categories'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->all());

        $route = $this->getRedirectionLink(route('admin.categories.index'), $request);

        return redirect($route)->with('success', 'Successfully created category');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        $categories = Category::pluck("name", 'id');

        return view('pages.admin.category.edit', compact('categories', 'category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $category->update($request->all());

        $route = $this->getRedirectionLink(route('admin.categories.index'), $request);

        return redirect($route)->with('success', "Successfully updated category");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category, Request $request)
    {
        $category->delete();

        $route = $this->getRedirectionLink(route('admin.categories.index'), $request);

        return redirect($route)->with('success', "Successfully deleted category");
    }


    public function getRedirectionLink($defaultLink, Request $request)
    {
        return $request->has('redirect') ? route(config("numisNepal.redirect." . $request->redirect . ".namespace"), config("numisNepal.redirect." . $request->redirect . ".queryParams")) : $defaultLink;
    }
}
