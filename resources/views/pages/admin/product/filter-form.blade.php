<div class="d-flex justify-content-end">

    @if (request()->has('filter'))
        <a href="{{ route('admin.products.index') }}" class="btn btn-white text-danger">
            <i class="bi bi-x-lg"></i>
            Cancel Filter
        </a>
    @else
        <form>
            <input type="hidden" name="filter" value="1" />
            <button class="btn btn-white">
                <i class="bi bi-filter"></i>
                Filter
            </button>
        </form>
    @endif

</div>

@if (request()->has('filter'))
    <form class="mb-4">
        @php
            $oldData = collect(request()->query())->filter(function ($value, $key) {
                return !in_array($key, ['name', 'category_id', 'themes', 'quality']);
            });
        @endphp

        @foreach ($oldData as $key => $item)
            <input type="hidden" name="{{ $key }}" value="{{ $item }}" />
        @endforeach

        <div class="row align-items-end">
            <div class="col-3">
                <x-form.text-input :label="trans('cruds.product.fields.name')" name="name" required :value="request('name')" />
            </div>
            <div class="col-3">
                <x-form.select2-input :label="trans('cruds.product.fields.category')" name="category_id" :options="$categories" placeholder="None" required
                    :value="(int) request('category_id')" />
            </div>
            <div class="col-3">
                <x-form.select2-input :label="trans('cruds.product.fields.theme')" name="themes" :options="$themes" multiple :value="request('themes')"
                    required />
            </div>
            <div class="col-3">
                <x-form.select2-input :label="trans('cruds.product.fields.quality')" name="quality" :options="\App\Models\Product::QUALITY" :value="request('quality')"
                    placeholder="None" required />
            </div>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-primary">Filter</button>
        </div>
    </form>
@endif
