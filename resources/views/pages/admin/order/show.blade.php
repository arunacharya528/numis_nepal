@extends('layout.main')

@section('title', trans('cruds.order.title_singular') . ' ' . trans('global.view'))

@php
    $details = [
        trans('cruds.order.fields.receiver') => $order->receiver,
        trans('cruds.order.fields.contact') => $order->contact,
        trans('cruds.order.fields.status') => $order->status,
    ];
@endphp
@section('content')
    <div class="card border-0">
        <div class="card-body">
            @foreach ($details as $key => $value)
                <div class="row">
                    <div class="col-2">
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
        <div class="card-body pt-0">
            <h5 class="card-title">Add Order Item</h5>
        </div>
    </div>
@endsection
