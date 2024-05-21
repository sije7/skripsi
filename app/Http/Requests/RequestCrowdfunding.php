<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestCrowdfunding extends FormRequest
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
            'Judul'=>'required',
            'user_id'=>'required',
            'Deskripsi'=>'required',
            'Dana'=>'required',
            'Lokasi'=>'required',
            'Gambar'=>'required|mimes:png,jpg,jpeg',
            'Deadline'=>'required|gte:7',
            'NomorRekening'=>'required',
            'NamaRekening'=>'required',
            'Bank'=>'required',
        ];
    }
}
