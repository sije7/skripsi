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
            'title' => 'required|string|max:55',
            'upload_video' => 'required|mimes:flv,mp4,mov,wmv|max:50000',
            'title_description' => 'required|string|max:55',
            'description' => 'required|string|max:1000',
            'upload_image'=> 'required|mimes:png,jpg|max:2048',
        ];
    }
}
