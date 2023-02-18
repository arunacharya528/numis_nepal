<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderItemRequest;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderItemRequest $request)
    {
        OrderItem::create($request->all());

        return redirect(route('admin.orders.show', $request->order_id))->with('success', "Successfully added item to order");
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderItem $orderItem): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderItem $orderItem)
    {
        $order = $orderItem->order;
        $products = Product::pluck('name', 'id');

        return view('pages.admin.orderItem.edit', compact('order', 'products', 'orderItem'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreOrderItemRequest $request, OrderItem $orderItem): RedirectResponse
    {
        $orderItem->update($request->all());

        return redirect(route('admin.orders.show', $request->order_id))->with('success', "Successfully updated order item");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderItem $orderItem)
    {
        $orderItem->delete();

        return redirect(route('admin.orders.destroy', $orderItem->order_id))->with('success', "Successfully deleted order item");
    }
}
