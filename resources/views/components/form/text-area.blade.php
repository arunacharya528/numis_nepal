<div class="form-group mb-3">
    <label for="{{ $name }}"
        class="{{ isset($required) && $required ? 'required' : '' }}">{{ $label }}</label>
    <textarea class="form-control {{ $errors->has($name) ? 'is-invalid' : '' }}" type="text" name="{{ $name }}"
        id="{{ $name }}" rows="{{ isset($rows) ? $rows : 5 }}">{{ isset($value) ? $value : old($name) }}</textarea>
    @error($name)
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

    @isset($helper)
        <small>{{$helper}}</small>
    @endisset
</div>
