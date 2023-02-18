@extends('layout.main')

@section('title', trans('global.create') . ' ' . trans('cruds.order.title_singular'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.orders.store') }}" method="POST">
                @csrf
                <x-form.text-input :label="trans('cruds.order.fields.receiver')" :helper="trans('cruds.order.fields.receiver_helper')" name="receiver" />

                <x-form.text-input :label="trans('cruds.order.fields.contact')" :helper="trans('cruds.order.fields.contact_helper')" name="contact" />

                <x-form.text-input :label="trans('cruds.order.fields.status')" :helper="trans('cruds.order.fields.status_helper')" name="status" />

                <button class="btn btn-primary">{{ trans('global.create') }}</button>
            </form>
        </div>
    </div>
@endsection
