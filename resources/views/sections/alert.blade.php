@if (session('error'))
    <div class="alert alert-danger" style="margin-top:20px">
        {{ session('error') }}
    </div>
@endif

@if (session('success'))
    <div class="alert alert-success" style="margin-top:20px">
        {{ session('success') }}
    </div>
@endif

@if (session('message'))
    <div class="alert alert-primary" style="margin-top:20px">
        {{ session('message') }}
    </div>
@endif
