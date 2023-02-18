<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\Receiver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['receiver', 'orderStatus'])->latest()->paginate();

        return view("pages.admin.order.index", compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $receivers = Receiver::pluck('name', 'id');
        $orderStatus = OrderStatus::pluck('title', 'id');

        return view('pages.admin.order.create', compact('receivers', 'orderStatus'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        DB::transaction(function () use ($request) {
            if (is_null($request->receiver_id)) {
                $receiver = Receiver::firstOrCreate([
                    'contact' => $request->contact,
                    'name' => $request->name
                ]);
                $request['receiver_id'] = $receiver->id;
            }

            Order::create($request->all());
        });


        return redirect()->route('admin.orders.index')->with('success', 'Successfully created order');
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $products = Product::pluck('name', 'id');
        return view('pages.admin.orderItem.create', compact('order', 'products'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order): Response
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order): RedirectResponse
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order): RedirectResponse
    {
        //
    }
}
