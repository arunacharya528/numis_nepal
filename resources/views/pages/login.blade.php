@extends('layout.login')
@section('title', 'Login')
@section('content')
    <div class="pt-4 pb-2">
        <h5 class="card-title text-center pb-0 fs-4">Login to Your Account</h5>
        <p class="text-center small">Enter your email & password to login</p>
    </div>
    <form class="row g-3" action="{{ route('login') }}" method="POST">
        @csrf
        <div class="col-12">
            <x-form.text-input label="Email" name="email" />
        </div>

        <div class="col-12">
            <x-form.text-input type="password" label="Password" name="password" />
        </div>

        <div class="col-12">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe">
                <label class="form-check-label" for="rememberMe">Remember me</label>
            </div>
        </div>
        <div class="col-12">
            <button class="btn btn-primary w-100" type="submit">Login</button>
        </div>
    </form>
@endsection
