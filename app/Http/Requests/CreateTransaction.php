<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTransaction extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'Gambar'=>'required|mimes:png,jpg,jpeg',
            'Dana'=>'required',
            'user_id'=>'required',
            'crowdfunding_id'=>'required'
        ];
    }
}
