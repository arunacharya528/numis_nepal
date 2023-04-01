@extends('layout.main')
@section('title', 'Dashboard')
@section('content')


    <div class="row">
        <div class="col-xxl-4 col-md-6">
            <div class="card info-card sales-card border-0">

                <div class="filter">
                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">

                        <li><a class="dropdown-item"
                                href="{{ route('admin.products.index') }}">{{ trans('global.view') }}</a></li>
                    </ul>
                </div>

                <div class="card-body">
                    <h5 class="card-title">Products <span>| All</span></h5>

                    <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-bookshelf"></i>
                        </div>
                        <div class="ps-3">
                            <h6>{{ $data->product_count }}</h6>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="col-xxl-4 col-md-6">
            <div class="card info-card sales-card border-0">

                <div class="filter">
                    <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">

                        <li><a class="dropdown-item"
                                href="{{ route('admin.categories.index') }}">{{ trans('global.view') }}</a></li>
                    </ul>
                </div>

                <div class="card-body">
                    <h5 class="card-title">Categories</h5>

                    <div class="d-flex align-items-center">
                        <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i class="bi bi-bookshelf"></i>
                        </div>
                        <div class="ps-3">
                            <h6>{{ $data->category_count }}</h6>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
@endsection
