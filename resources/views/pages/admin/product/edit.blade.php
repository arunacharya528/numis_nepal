@extends('layout.main')

@section('title', trans('global.edit') . ' ' . trans('cruds.product.title_singular'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.products.update',$product) }}" method="POST">
                @method("PUT")
                @csrf
                <x-form.text-input :label="trans('cruds.product.fields.name')" :helper="trans('cruds.product.fields.name_helper')" name="name" :value="$product->name" required />

                <x-form.text-area :label="trans('cruds.product.fields.description')" :helper="trans('cruds.product.fields.description_helper')" name="description" :value="$product->description" required />

                <button class="btn btn-primary">{{ trans('global.update') }}</button>
            </form>
        </div>
    </div>
@endsection
