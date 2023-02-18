<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        // dd(request());
        return [
            'name' => ['required_if:receiver_id,null'],
            'contact' => ['required_if:receiver_id,null'],
            'receiver_id' => ['nullable'],
            'order_status_id' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'status_id.required' => 'Status is required'
        ];
    }
}
