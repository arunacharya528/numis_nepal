@extends('pages.admin.order.show')

@section('orderContent')
    <div class="card border-0">
        <form class="card-body pt-0" action="{{ route('admin.order-item.store') }}" method="POST">
            @csrf
            <h5 class="card-title">{{ trans('global.create') . ' ' . trans('cruds.orderItems.title_singular') }} </h5>
            <input type="hidden" name="order_id" value="{{ $order->id }}" />
            <div class="row">
                <div class="col-4">
                    <x-form.select2-input :label="trans('cruds.orderItems.fields.product_id')" :helper="trans('cruds.orderItems.fields.product_id_helper')" name="product_id" :options="$products"
                        placeholder="None" />
                </div>
                <div class="col-4">
                    <x-form.text-input :label="trans('cruds.orderItems.fields.quantity')" :helper="trans('cruds.orderItems.fields.quantity_helper')" name="quantity" />
                </div>
                <div class="col-4">
                    <x-form.text-input type="number" :label="trans('cruds.orderItems.fields.discount_percent')" :helper="trans('cruds.orderItems.fields.discount_percent_helper')" name="discount_percent" />
                </div>
            </div>

            <button class="btn btn-primary">{{ trans('global.save') }}</button>
        </form>
    </div>
@endsection
