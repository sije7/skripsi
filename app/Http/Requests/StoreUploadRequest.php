<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUploadRequest extends FormRequest
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
            'Judul' => 'required|string|max:55',
            'Video' => 'required|mimes:flv,mp4,mov,wmv',
            'JudulKonten' => 'required|string|max:55',
            'Konten' => 'required|string|max:1000',
            'Gambar'=> 'required|mimes:png,jpg',
            'Thumbnail'=> 'required|mimes:png,jpg',
            'TipePembelajaran'=> 'required',
            'JenisPembelajaran'=> 'required'
        ];
    }
}
