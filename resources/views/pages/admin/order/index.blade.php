@extends('layout.main')

@section('title', trans('cruds.order.title') . ' ' . trans('global.list'))
@section('content')
    <div class="mb-2">
        <a href="{{ route('admin.orders.create') }}" class="btn btn-primary">{{ trans('global.create') }}
            {{ trans('cruds.order.title_singular') }}</a>
    </div>
    <div class="card border-0">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">{{ trans('cruds.order.fields.receiver') }}</th>
                            <th scope="col">{{ trans('cruds.order.fields.contact') }}</th>
                            <th scope="col">{{ trans('cruds.order.fields.status') }}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($orders as $order)
                            <tr>
                                <th scope="row">{{ $order->id }}</th>
                                <td>{{ $order->receiver }}</td>
                                <td>{{ $order->contact }}</td>
                                <td>{{ $order->status }}</td>
                                <th>
                                    <a href="{{ route('admin.orders.show', $order) }}"
                                        class="btn btn-sm btn-primary">{{ trans('global.view') }}</a>

                                    <a href="{{ route('admin.orders.edit', $order) }}"
                                        class="btn btn-sm btn-primary">{{ trans('global.edit') }}</a>

                                    <form action="{{ route('admin.orders.destroy', $order) }}" style="display: inline"
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
            {{ $orders->links() }}
        </div>
    </div>
@endsection
