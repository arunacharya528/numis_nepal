<aside id="sidebar" class="sidebar">
    <ul class="sidebar-nav" id="sidebar-nav">
        @foreach (config('sidebar') as $item)
            @php
                $hasSubMenu = isset($item['subMenu']);
            @endphp
            <li class="nav-item">
                <a class="nav-link {{ $hasSubMenu ? 'collapsed' : '' }}" href="{{ $item['link'] }}"
                    @if ($hasSubMenu) data-bs-target="#nav{{ $loop->index }}" data-bs-toggle="collapse" @endif>
                    <i class="bi bi-grid"></i>
                    <span>{{ $item['name'] }}</span>

                    @if ($hasSubMenu)
                        <i class="bi bi-chevron-down ms-auto"></i>
                    @endif
                </a>

                @if ($hasSubMenu)
                    <ul id="nav{{ $loop->index }}" class="nav-content collapse" data-bs-parent="#sidebar-nav">
                        @foreach ($item['subMenu'] as $subMenuItem)
                            <li>
                                <a href="{{ $subMenuItem['link'] }}">
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
