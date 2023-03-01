@extends('layout.main')

@section('title', trans('global.edit') . ' ' . trans('cruds.product.title_singular'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.products.update', $product) }}" method="POST">
                @method('PUT')
                @csrf
                <x-form.text-input :label="trans('cruds.product.fields.name')" :helper="trans('cruds.product.fields.name_helper')" name="name" :value="$product->name" required />

                <x-form.text-input type="number" :label="trans('cruds.product.fields.quantity')" :helper="trans('cruds.product.fields.quantity_helper')" :value="$product->quantity" name="quantity"
                    required />

                <x-form.text-input type="number" :label="trans('cruds.product.fields.price')" :helper="trans('cruds.product.fields.price_helper')" :value="$product->price" name="price"
                    required />

                <x-form.text-area :label="trans('cruds.product.fields.description')" :helper="trans('cruds.product.fields.description_helper')" :value="$product->description" name="description" required />

                <x-form.select2-input :label="trans('cruds.product.fields.theme')" :helper="trans('cruds.product.fields.theme_helper')" name="themes" :options="$themes" multiple required createOnGo :value="$product->themes->pluck('id')->toArray()"/>

                <x-form.select2-input :label="trans('cruds.product.fields.quality')" :helper="trans('cruds.product.fields.quality_helper')" name="quality" :options="\App\Models\Product::QUALITY" :value="$product->quality" required/>

                <button class="btn btn-primary">{{ trans('global.update') }}</button>
            </form>
        </div>
    </div>
@endsection
