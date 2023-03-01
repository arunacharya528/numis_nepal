@extends('layout.main')

@section('title', trans('global.create') . ' ' . trans('cruds.order.title_singular'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.orders.store') }}" method="POST">
                @csrf
                <x-form.text-input :label="trans('cruds.order.fields.receiver')" :helper="trans('cruds.order.fields.receiver_helper')" name="name" />

                <x-form.text-input :label="trans('cruds.order.fields.contact')" :helper="trans('cruds.order.fields.contact_helper')" name="contact" />

                <div class="border-bottom border-3 text-center mb-3">OR</div>

                <x-form.select2-input :label="trans('cruds.order.fields.receiver_id')" :helper="trans('cruds.order.fields.receiver_id_helper')" name="receiver_id" :options="$receivers" placeholder="None"  />

                <x-form.select2-input :label="trans('cruds.order.fields.status')" :helper="trans('cruds.order.fields.status_helper')" name="order_status_id" :options="$orderStatus" placeholder="Select order status" />

                <x-form.text-input type="number" :label="trans('cruds.order.fields.shipping_price')" :helper="trans('cruds.order.fields.shipping_price_helper')" name="shipping_price" :value="\App\Models\Order::SHIPPING_PRICE"/>

                <button class="btn btn-primary">{{ trans('global.create') }}</button>
            </form>
        </div>
    </div>
@endsection
