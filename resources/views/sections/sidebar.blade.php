@php
    $sideBar = [
        [
            'generalRoute' => 'admin/dashboard',
            'name' => trans('cruds.dashboard.title'),
            'icon' => 'bi-menu-button-wide',
            'link' => route('admin.dashboard'),
        ],
        [
            'generalRoute' => 'admin/product-management*',
            'name' => trans('cruds.productManagement.title'),
            'icon' => 'bi-menu-button-wide',
            'subMenu' => [
                [
                    'name' => trans('cruds.product.title'),
                    'link' => route('admin.products.index'),
                ],
                [
                    'name' => trans('cruds.category.title'),
                    'link' => route('admin.categories.index'),
                ],
            ],
        ],
        [
            'generalRoute' => 'admin/order-management*',
            'name' => trans('cruds.orderManagement.title'),
            'icon' => 'bi-menu-button-wide',
            'subMenu' => [
                [
                    'name' => trans('cruds.order.title'),
                    'link' => route('admin.orders.index'),
                ],
                [
                    'name' => trans('cruds.orderStatus.title'),
                    'link' => route('admin.order-status.index'),
                ],
            ],
        ],
    ];
@endphp
<aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
        @foreach ($sideBar as $item)
            @php
                $hasSubMenu = isset($item['subMenu']);
                $isPartOfRoute = request()->is($item['generalRoute']);
            @endphp
            <li class="nav-item">
                <a class="nav-link {{ $hasSubMenu && $isPartOfRoute ? '' : 'collapsed' }}"
                    href="{{ $hasSubMenu && !isset($item['link']) ? '#' : $item['link'] }}"
                    @if ($hasSubMenu) data-bs-target="#nav{{ $loop->index }}" data-bs-toggle="collapse" @endif>
                    <i class="bi bi-grid"></i>
                    <span>{{ $item['name'] }}</span>

                    @if ($hasSubMenu)
                        <i class="bi bi-chevron-down ms-auto"></i>
                    @endif
                </a>

                @if ($hasSubMenu)
                    <ul id="nav{{ $loop->index }}" class="nav-content collapse {{ $isPartOfRoute ? 'show' : '' }}"
                        data-bs-parent="#sidebar-nav">
                        @foreach ($item['subMenu'] as $subMenuItem)
                            @php
                                $matchesRoute = url()->current() === $subMenuItem['link'];
                            @endphp
                            <li>
                                <a href="{{ $subMenuItem['link'] }}"
                                    class="text-decoration-none {{ $matchesRoute ? 'active' : '' }}">
                                    <i class="bi bi-circle"></i><span>{{ $subMenuItem['name'] }}</span>
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @endif
            </li>
        @endforeach
    </ul>

</aside>
