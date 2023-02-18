<div class="form-group">
    <label class="{{ isset($required) && $required ? 'required' : '' }}" for="username">
        {{ $label }}
    </label>
    <input class="form-control {{ $errors->has($name) ? 'is-invalid' : '' }}" type="{{ isset($type) ? $type : 'text' }}"
        name="{{ $name }}" id="{{ $name }}" value="{{ old($name, isset($value) ? $value : '') }}"
        {{ isset($disabled) ? 'disabled' : '' }}>

    @error($name)
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror

    @isset($helper)
        <span class="help-block">{{ $helper }}</span>
    @endisset
</div>
