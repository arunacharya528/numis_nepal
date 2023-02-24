@inject('Price', '\App\Http\Controllers\OrderController')
@extends('layout.main')

@section('title', trans('cruds.order.title_singular') . ' ' . trans('global.view'))

@php
    $details = [
        'Invoice No' => $order->id,
        trans('cruds.order.fields.receiver') => $order->receiver->name,
        trans('cruds.order.fields.contact') => $order->receiver->contact,
        trans('cruds.order.fields.status') => $order->orderStatus->title,
        '-' => '-',
        trans('cruds.order.fields.ordered_at') => $order->ordered_at,
        trans('global.updated_at') => $order->updated_at,
    ];
@endphp
@section('content')
    <div class="card border-0">
        <div class="card-body">
            @foreach ($details as $key => $value)
                <div class="row">
                    <div class="col-3">
                        <b>{{ $key }}</b>
                    </div>
                    <div class="col">
                        {{ $value }}
                    </div>
                </div>
            @endforeach
            <a href="{{ route('admin.orders.download', $order) }}" class="btn btn-primary">Download PDF</a>
        </div>
    </div>

    <div class="card border-0">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">{{ trans('cruds.orderItems.fields.product_id') }}</th>
                            <th scope="col">{{ trans('cruds.product.fields.price') }}</th>
                            <th scope="col">{{ trans('cruds.orderItems.fields.quantity') }}</th>
                            <th scope="col">Discount</th>
                            <th scope="col">{{ trans('cruds.orderItems.fields.amount') }}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($order->orderItems as $item)
                            <tr>
                                <td>{{ $item->product->name }}</td>
                                <td>{{ $item->product->price }}</td>
                                <td>{{ $item->quantity }}</td>
                                <td>{{ $Price->discountedPrice($item->product->price, $item->discount_percent) * $item->quantity }}
                                    ({{ $item->discount_percent }}%)
                                </td>
                                <td>{{ $item->amount }}</td>
                                <th>

                                    <a href="{{ route('admin.order-item.edit', $item->id) }}"
                                        class="btn btn-sm btn-primary">{{ trans('global.edit') }}</a>

                                    <form action="{{ route('admin.order-item.destroy', $item->id) }}"
                                        style="display: inline" method="POST"
                                        onsubmit="return confirm(`{{ trans('global.are_you_sure') }}`)">
                                        @method('DELETE')
                                        @csrf
                                        <button class="btn btn-sm btn-danger">{{ trans('global.delete') }}</button>
                                    </form>
                                </th>
                            </tr>
                        @endforeach
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Total</th>
                            <th>{{ $order->discount }}</th>
                            <th>{{ $order->sub_total }}</th>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    @yield('orderContent')
@endsection
