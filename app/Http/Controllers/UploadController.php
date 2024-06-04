<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use App\Http\Requests\StoreUploadRequest;
use App\Http\Requests\UpdateUploadRequest;

class UploadController extends Controller
{
    public function createUpload(StoreUploadRequest $request)
    {
        $upload = new Upload();
        $upload->title = $request->title;
        $upload->user_id = $request->user;
        $upload->description = $request->description;
        $upload->title_description = $request->title_description;

        $videoName = $request ->upload_video->getClientOriginalName('upload_video');
        $path = $request->upload_video->storeAs('videos',$videoName,'public');

        $imgName = $request ->upload_image->getClientOriginalName('upload_image');
        $pathImg = $request->upload_image->storeAs('images',$imgName,'public');

        $upload->upload_video = '/storage/' .$path;
        $upload->upload_image = '/storage/' .$pathImg;

        $upload->save();
        return "Upload Berhasil";

    }
}
