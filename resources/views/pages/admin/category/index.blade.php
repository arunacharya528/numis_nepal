@extends('layout.main')

@section('title', trans('cruds.category.title') . ' ' . trans('global.list'))
@section('content')
    <div class="mb-2">
        <a href="{{ route('admin.categories.create') }}" class="btn btn-primary">{{ trans('global.create') }}
            {{ trans('cruds.category.title_singular') }}</a>
    </div>
    <div class="card border-0">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{{ trans('cruds.category.fields.name') }}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($categories as $category)
                            <tr>
                                <th scope="row">{{ $category->id }}</th>
                                <td>{{ $category->name }}</td>
                                <th>
                                    <a href="{{ route('admin.categories.edit', $category) }}"
                                        class="btn btn-sm btn-primary">{{ trans('global.edit') }}</a>

                                    <form action="{{ route('admin.products.destroy', $category) }}" style="display: inline"
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
@endsection
