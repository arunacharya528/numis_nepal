<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderItemRequest;
use App\Http\Trait\Price;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OrderItemController extends Controller
{
    use Price;
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
        DB::transaction(function () use ($request) {
            $request['amount'] = 0;
            $request->request->remove('_token');

            OrderItem::updateOrCreate([
                'product_id' => $request->product_id
            ], [
                'order_id' => $request->order_id,
                'quantity' => $request->quantity,
                'discount_percent' => is_null($request->discount_percent) ? 0 : $request->discount_percent,
                'amount' => 0
            ]);

            $OrderController = new OrderController();
            $OrderController->calculatePrice($request->order_id);
        });

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

        DB::transaction(function () use ($request, $orderItem) {
            $orderItem->update($request->all());

            $OrderController = new OrderController();
            $OrderController->calculatePrice($request->order_id);
        });

        return redirect(route('admin.orders.show', $request->order_id))->with('success', "Successfully updated order item");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderItem $orderItem)
    {

        DB::transaction(function () use ($orderItem) {
            $orderItem->delete();

            $OrderController = new OrderController();
            $OrderController->calculatePrice($orderItem->order_id);
        });

        return redirect(route('admin.orders.destroy', $orderItem->order_id))->with('success', "Successfully deleted order item");
    }
}
