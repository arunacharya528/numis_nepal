<?php

namespace App\Http\Controllers;

use App\Models\OrderStatus;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statuses = OrderStatus::get();

        return view('pages.admin.orderStatus.index', compact('statuses'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('pages.admin.orderStatus.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(['title' => 'required']);

        OrderStatus::create($request->all());

        return redirect()->route('admin.order-status.index')->with('success', 'Successfully created order status');
    }

    /**
     * Display the specified resource.
     */
    public function show(OrderStatus $orderStatus): Response
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OrderStatus $orderStatus)
    {
        return view('pages.admin.orderStatus.edit', compact('orderStatus'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OrderStatus $orderStatus): RedirectResponse
    {
        $request->validate(['title' => 'required']);

        $orderStatus->update($request->all());

        return redirect()->route('admin.order-status.index')->with('success', 'Successfully updated order status');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OrderStatus $orderStatus)
    {
        $orderStatus->delete();

        return redirect()->route('admin.order-status.index')->with('success', 'Successfully deleted order status');
    }
}
