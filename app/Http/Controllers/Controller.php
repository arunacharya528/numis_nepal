<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\View;

class Controller extends BaseController
{
    use AuthorizesRequests;
    use ValidatesRequests;

    public function getRedirectionLink($defaultLink, Request $request, $configuration = [])
    {
        return $request->has('redirect') ? route(config("numisNepal.redirect." . $request->redirect . ".namespace"), array_merge(config("numisNepal.redirect." . $request->redirect . ".queryParams"), $configuration)) : $defaultLink;
    }
}
