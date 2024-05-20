<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUsersRequest extends FormRequest
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
            'email' => 'required|string|email|max:255|unique:users,email,'.$this->route('user')->id,
            'password' => [
                'confirmed',
                Password::min(8)
                ->letters()
                ->symbols()
            ],
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'umur' => 'nullable|integer|min:0|max:150',
            'jenis_kelamin' => 'nullable|string|in:pria,wanita',
            'role' => 'required|string|in:admin,user,lembaga',
            'nomor_telepon' => 'nullable|string|regex:/^[0-9]{10,15}$/'
        ];
    }
}
