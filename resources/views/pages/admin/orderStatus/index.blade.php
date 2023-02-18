@extends('layout.main')

@section('title', trans('cruds.orderStatus.title'))
@section('content')
    <div class="mb-2">
        <a href="{{ route('admin.order-status.create') }}" class="btn btn-primary">{{ trans('global.create') }}
            {{ trans('cruds.orderStatus.title_singular') }}</a>
    </div>
    <div class="card border-0">
        <div class="card-body">
            <div class="table-responsive">
                <table class="table table-sm">
                    <thead>
                        <tr>
                            <th scope="col">{{ trans('cruds.orderStatus.fields.title') }}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($statuses as $status)
                            <tr>
                                <td>{{ $status->title }}</td>
                                <th>
                                    <a href="{{ route('admin.order-status.edit', $status) }}"
                                        class="btn btn-sm btn-primary">{{ trans('global.edit') }}</a>

                                    <form action="{{ route('admin.order-status.destroy', $status) }}"
                                        style="display: inline" method="POST"
                                        onsubmit="return confirm(`{{ trans('global.are_you_sure') }}`)">
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
