@extends('layout.main')

@section('title', trans('global.create') . ' ' . trans('cruds.category.title_singular'))
@section('content')
    <div class="card border-0">
        <div class="card-body">
            <form action="{{ route('admin.categories.store') }}" method="POST">
                @csrf
                
                <x-redirect/>

                <x-form.text-input :label="trans('cruds.category.fields.name')" :helper="trans('cruds.category.fields.name_helper')" name="name" required />

                @if (request()->has('parent'))
                    <input type="hidden" name="parent_id" value="{{ request('parent') }}" />
                @else
                    <x-form.select2-input :label="trans('cruds.category.fields.parent_id')" :helper="trans('cruds.category.fields.parent_id_helper')" name="parent_id" :options="$categories" required
                        placeholder="None" />
                @endif


                <button class="btn btn-primary">{{ trans('global.create') }}</button>
            </form>
        </div>
    </div>
@endsection
