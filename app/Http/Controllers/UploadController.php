<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use App\Http\Requests\StoreUploadRequest;
use App\Http\Requests\UpdateUploadRequest;
use App\Models\LearningCategory;
use App\Models\LearningSubCategory;
use App\Models\Subcategory;

class UploadController extends Controller
{
    public function createUpload(StoreUploadRequest $request)
    {
        $upload = new Upload();
        $upload->title = $request->Judul;
        $upload->user_id = $request->user;
        $upload->description = $request->Konten;
        $upload->title_description = $request->JudulKonten;
        $upload->subcategory_id = $request->JenisPembelajaran;
        $upload->status = 0;

        $videoName = $request ->Video->getClientOriginalName('Video');
        $path = $request->Video->storeAs('videos',$videoName,'public');

        $imgName = $request ->Gambar->getClientOriginalName('Gambar');
        $pathImg = $request->Gambar->storeAs('images',$imgName,'public');

        $thumbnail = $request ->Thumbnail->getClientOriginalName('Thumbnail');
        $pathThumbnail = $request->Thumbnail->storeAs('images',$thumbnail,'public');

        $upload->upload_video = '/storage/' .$path;
        $upload->upload_image = '/storage/' .$pathImg;
        $upload->thumbnail = '/storage/'.$pathThumbnail;

        $upload->save();
        return "Upload Berhasil";

    }

    public function getLearningCategories(){
        $categories = LearningCategory::all();
        foreach($categories as $c){
            $sub_categories = LearningSubCategory::where('category_id',$c->id)->get();
            $c->sub_categories = $sub_categories;
        }

        return compact('categories');
    }
}
