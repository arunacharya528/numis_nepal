<div class="pagetitle">
    <h1>@yield('title')</h1>
    @isset($breadcrumbs)
        <nav>
            <ol class="breadcrumb">
                @foreach ($breadcrumbs as $link => $name)
                    <li class="breadcrumb-item"><a href="{{ $link }}">{{ $name }}</a></li>
                @endforeach
            </ol>
        </nav>
    @endisset
</div>
