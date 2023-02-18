<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderItemRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'order_id' => ['required'],
            'product_id' => ['required'],
            'quantity' => ['required'],
            'discount_percent' => ['nullable','numeric']
        ];
    }
}
