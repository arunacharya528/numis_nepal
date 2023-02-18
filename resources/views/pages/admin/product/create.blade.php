@extends('layout.main')

@section('title', trans('global.create') . ' ' . trans('cruds.product.title_singular'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.products.store') }}" method="POST">
                @csrf
                <x-form.text-input :label="trans('cruds.product.fields.name')" :helper="trans('cruds.product.fields.name_helper')" name="name" required />

                <x-form.text-area :label="trans('cruds.product.fields.description')" :helper="trans('cruds.product.fields.description_helper')" name="description" required />

                <button class="btn btn-primary">{{ trans('global.create') }}</button>
            </form>
        </div>
    </div>
@endsection
