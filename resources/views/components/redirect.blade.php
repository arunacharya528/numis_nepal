@if (request()->has('redirect'))
    <input type="hidden" name="redirect" value="{{ request('redirect') }}" />
@endif
