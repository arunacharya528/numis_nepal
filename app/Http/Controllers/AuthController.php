<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        if (!Auth::attempt($request->only(['email', 'password']), $request->remember === 'on')) {
            return redirect()->back()->with('error', 'Unable to login to your account');
        };

        return redirect(route('admin.dashboard'))->with('success', 'Successfully logged in to your account');
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route("home")->with('success', 'Successfully logged out');
    }
}
