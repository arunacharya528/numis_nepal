<div>
    @foreach ($categories as $category)
        <div style="margin-left: 1rem; {{ isset($isFirst) ? 'border-left:2px dotted black;' : '' }}">
            <div style="padding: 0.5rem 1rem;" class="d-flex align-items-center">
                <div>
                    {{ $category->name }} --- {{$category->products_count}}
                </div>

                <div class="dropdown">
                    <a class="btn btn-white dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="bi bi-three-dots"></i>
                    </a>

                    <ul class="dropdown-menu">
                        <li><a href="{{ route('admin.categories.create', ['redirect' => config('numisNepal.redirect.cat-map.name'), 'parent' => $category->id]) }}"
                                class="dropdown-item">{{ trans('global.add') }} Sub-Category</a></li>

                        <li><a href="{{ route('admin.products.index', ['filter' => true, 'category_id' => $category->id]) }}"
                                class="dropdown-item">{{ trans('global.view') }} {{ trans('cruds.product.title') }}</a>
                        </li>
                        <li>

                            <a href="{{ route('admin.categories.edit', [$category, 'redirect' => config('numisNepal.redirect.cat-map.name')]) }}"
                                class="dropdown-item">{{ trans('global.edit') }}</a>
                        </li>

                        <li>
                            <form action="{{ route('admin.categories.destroy', $category) }}" style="display: inline"
                                method="POST" onsubmit="return confirm(`{{ trans('global.are_you_sure') }}`)"
                                class="text-danger">
                                @method('DELETE')
                                @csrf
                                <input type="hidden" name="redirect"
                                    value="{{ config('numisNepal.redirect.cat-map.name') }}" />

                                <button class="dropdown-item">{{ trans('global.delete') }}</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
            @if ($category->subCategories->count() > 0)
                @include('pages.admin.category.map', [
                    'categories' => $category->subCategories,
                    'isFirst' => false,
                ])
            @endif
        </div>
    @endforeach
</div>
