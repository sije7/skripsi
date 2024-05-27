<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUsersRequest extends FormRequest
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
            'name' => 'required|string|max:55',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                ->letters()
                ->symbols()
            ],
            'role' => 'required|string|in:admin,user,lembaga',
            'no_req' => 'nullable|string|regex:/^[0-9]{10,15}$/',
            'jenis_kelamin' => 'nullable|string|in:pria,wanita',
            'nomor_telepon' => 'nullable|string|regex:/^[0-9]{10,15}$/',
            'umur' => 'nullable|integer|min:0|max:150',
        ];
    }
}
