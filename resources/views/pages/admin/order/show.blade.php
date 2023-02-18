@extends('layout.main')

@section('title', trans('cruds.order.title_singular') . ' ' . trans('global.view'))

@php
    $details = [
        trans('cruds.order.fields.receiver') => $order->receiver->name,
        trans('cruds.order.fields.contact') => $order->receiver->contact,
        trans('cruds.order.fields.status') => $order->orderStatus->title,
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
        </div>
    </div>

    <div class="card border-0">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">{{ trans('cruds.orderItems.fields.product_id') }}</th>
                            <th scope="col">{{ trans('cruds.orderItems.fields.quantity') }}</th>
                            <th scope="col">{{ trans('cruds.orderItems.fields.discount_percent') }}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($order->orderItems as $item)
                            <tr>
                                <td>{{ $item->product->name }}</td>
                                <td>{{ $item->quantity }}</td>
                                <td>{{ $item->discount_percent }}</td>
                                <th>

                                    <a href="{{ route('admin.order-item.edit', $item->id) }}"
                                        class="btn btn-sm btn-primary">{{ trans('global.edit') }}</a>

                                    <form action="{{ route('admin.order-item.destroy', $item->id) }}" style="display: inline"
                                        method="POST" onsubmit="return confirm(`{{ trans('global.are_you_sure') }}`)">
                                        @method('DELETE')
                                        @csrf
                                        <button class="btn btn-sm btn-danger">{{ trans('global.delete') }}</button>
                                    </form>
                                </th>
                            </tr>
                        @endforeach

                    </tbody>
                </table>
            </div>
        </div>
    </div>

    @yield('orderContent')
@endsection
