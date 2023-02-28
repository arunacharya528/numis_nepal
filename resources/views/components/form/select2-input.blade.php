<div class="form-group mb-3">
    <label class="{{ isset($required) && $required ? 'required' : '' }}"
        for="{{ $name }}">{{ $label }}</label>
    @isset($multiple)
        <div style="padding-bottom: 4px">
            <span class="btn btn-info btn-sm select-all" style="border-radius: 0">{{ trans('global.select_all') }}</span>
            <span class="btn btn-info btn-sm deselect-all" style="border-radius: 0">{{ trans('global.deselect_all') }}</span>
        </div>
    @endisset
    <select
        class="form-control select2 {{ $errors->has($name) ? 'is-invalid' : '' }} {{ isset($createOnGo) ? 'create-on-go' : '' }}"
        name="{{ $name }}{{ isset($multiple) ? '[]' : '' }}" id="{{ $name }}"
        {{ isset($multiple) ? 'multiple' : '' }} {{ isset($disabled) && $disabled ? 'disabled' : '' }}>

        @isset($placeholder)
            <option value="">{{ $placeholder }}</option>
        @endisset
        @foreach ($options as $key => $option)
            @php
                $isMultiple = isset($multiple);
                $keyIsInHistory = $isMultiple && in_array($key, old($name, []));
                $keyIsInProvidedValue = $isMultiple && isset($value) && gettype($value) === 'array' && in_array($key, $value);

                $isNotMultiple = !$isMultiple;
                $keyIsOldValue = $isNotMultiple && old($name) === (string) $key;
                $keyIsProvidedValue = $isNotMultiple && isset($value) && $value === $key;
            @endphp
            <option value="{{ $key }}"
                {{ $keyIsInHistory || $keyIsInProvidedValue || ($keyIsOldValue || $keyIsProvidedValue) ? 'selected' : '' }}>
                {{ $option }}
            </option>
        @endforeach
    </select>

    @error($name)
        <div class="invalid-feedback">
            {{ $message }}
        </div>
    @enderror
    @isset($helper)
        <small>{{ $helper }}</small>
    @endisset
</div>
