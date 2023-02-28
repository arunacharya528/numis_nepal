@extends('layout.main')

@section('title', trans('global.edit') . ' ' . trans('cruds.category.title_singular'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.categories.update', $category) }}" method="POST">
                @csrf
                @method('PUT')

                @if (request()->has('redirect'))
                    <input type="hidden" name="redirect" value="{{ request('redirect') }}" />
                @endif

                <x-form.text-input :label="trans('cruds.category.fields.name')" :helper="trans('cruds.category.fields.name_helper')" name="name" :value="$category->name" required />

                <x-form.select2-input :label="trans('cruds.category.fields.parent_id')" :helper="trans('cruds.category.fields.parent_id_helper')" name="parent_id" :options="$categories"
                    :value="$category->parent_id" required placeholder="None" />

                <button class="btn btn-primary">{{ trans('global.update') }}</button>
            </form>
        </div>
    </div>
@endsection
