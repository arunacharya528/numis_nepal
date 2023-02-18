@extends('layout.main')

@section('title', trans('global.create') . ' ' . trans('cruds.orderStatus.title'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.order-status.store') }}" method="POST">
                @csrf
                <x-form.text-input :label="trans('cruds.orderStatus.fields.title')" :helper="trans('cruds.orderStatus.fields.title_helper')" name="title" />

                <button class="btn btn-primary">{{ trans('global.create') }}</button>
            </form>
        </div>
    </div>
@endsection
