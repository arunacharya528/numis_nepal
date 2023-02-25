<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Trait\Price;
use App\Models\Order;
use App\Models\OrderStatus;
use App\Models\Product;
use App\Models\Receiver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use \Barryvdh\DomPDF\Facade\Pdf;

class OrderController extends Controller
{
    use Price;
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
    public function edit(Order $order)
    {
        $orderStatus = OrderStatus::pluck('title', 'id');

        return view('pages.admin.order.edit',compact('order','orderStatus'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $order->update($request->all());

        return redirect()->route('admin.orders.index')->with('success','Successfully updated order');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return redirect()->route('admin.orders.index')->with('success','Successfully deleted order');
    }

    public function download(Order $order)
    {
        $pdf = Pdf::loadView('pdf.order', ['order' => $order]);
        return $pdf->download('invoice.pdf');
    }

    public function calculatePrice($order_id)
    {
        $order = Order::with(['orderItems.product'])->find($order_id);
        foreach ($order->orderItems as $item) {
            $item->amount = $this->calculateTotal($item->quantity, $item->product->price, $item->discount_percent);
            $item->save();
        }

        $order = Order::find($order_id);
        $order->sub_total = $order->orderItems->sum('amount');
        $order->discount =  $order->orderItems->map(function ($item) {
            return $this->discountedPrice($item->product->price, $item->discount_percent) * $item->quantity;
        })->sum();

        $order->save();
    }
}
