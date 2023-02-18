@extends('layout.main')

@section('title', trans('global.edit') . ' ' . trans('cruds.orderStatus.title'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.order-status.update',$orderStatus) }}" method="POST">
                @csrf
                @method('PUT')
                <x-form.text-input :label="trans('cruds.orderStatus.fields.title')" :helper="trans('cruds.orderStatus.fields.title_helper')" name="title" :value="$orderStatus->title" />

                <button class="btn btn-primary">{{ trans('global.update') }}</button>
            </form>
        </div>
    </div>
@endsection
