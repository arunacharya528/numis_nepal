@extends('layout.main')

@section('title', trans('global.edit') . ' ' . trans('cruds.order.title_singular'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.orders.update',$order) }}" method="POST">
                @method("PUT")
                @csrf

                <x-form.select2-input :label="trans('cruds.order.fields.status')" :helper="trans('cruds.order.fields.status_helper')" name="order_status_id" :options="$orderStatus" placeholder="Select order status" :value="$order->order_status_id" />

                <button class="btn btn-primary">{{ trans('global.update') }}</button>
            </form>
        </div>
    </div>
@endsection
