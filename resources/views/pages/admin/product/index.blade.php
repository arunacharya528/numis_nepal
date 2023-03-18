@extends('layout.main')

@section('title', trans('cruds.product.title') . ' ' . trans('global.list'))
@section('content')
    <div class="mb-2">
        <a href="{{ route('admin.products.create') }}" class="btn btn-primary">{{ trans('global.create') }}
            {{ trans('cruds.product.title_singular') }}</a>
    </div>
    <div class="card border-0">
        <div class="card-body">
            @include('pages.admin.product.filter-form')
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{{ trans('cruds.product.fields.name') }}</th>
                            <th scope="col">{{ trans('cruds.product.fields.quantity') }}</th>
                            <th scope="col">{{ trans('cruds.product.fields.quality') }}</th>
                            <th scope="col">{{ trans('cruds.product.fields.theme') }}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($products as $product)
                            <tr>
                                <th scope="row">{{ $product->id }}</th>
                                <td>{{ $product->name }}</td>
                                <td>{{ $product->quantity }}</td>
                                <td>{{ \App\Models\Product::QUALITY[$product->quality] }}</td>
                                <td>
                                    @foreach ($product->themes->pluck('title')->toArray() as $theme)
                                        <span class="badge bg-primary">{{ $theme }}</span>
                                    @endforeach
                                </td>
                                <th>
                                    <a href="{{ route('admin.products.edit', $product) }}"
                                        class="btn btn-sm btn-primary">{{ trans('global.edit') }}</a>

                                    <form action="{{ route('admin.products.destroy', $product) }}" style="display: inline"
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
            {{ $products->links() }}
        </div>
    </div>
@endsection
