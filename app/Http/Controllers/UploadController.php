<?php

namespace App\Http\Controllers;

use App\Models\Upload;
use App\Http\Requests\StoreUploadRequest;
use App\Http\Requests\UpdateUploadRequest;
use App\Models\LearningCategory;
use App\Models\LearningSubCategory;
use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

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

        $videoName = $request->Video->getClientOriginalName('Video');
        $path = $request->Video->storeAs('videos', $videoName, 'public');

        $imgName = $request->Gambar->getClientOriginalName('Gambar');
        $pathImg = $request->Gambar->storeAs('images', $imgName, 'public');

        $thumbnail = $request->Thumbnail->getClientOriginalName('Thumbnail');
        $pathThumbnail = $request->Thumbnail->storeAs('images', $thumbnail, 'public');

        $upload->upload_video = '/storage/' . $path;
        $upload->upload_image = '/storage/' . $pathImg;
        $upload->thumbnail = '/storage/' . $pathThumbnail;

        $upload->save();
        return "Upload Berhasil";
    }

    public function getLearningCategories()
    {
        $categories = LearningCategory::all();
        foreach ($categories as $c) {
            $sub_categories = LearningSubCategory::where('category_id', $c->id)->get();
            $c->sub_categories = $sub_categories;
        }

        return compact('categories');
    }

    public function getLearnings(Request $request)
    {
        $learnings = Upload::where('status', $request->status)->get();
        foreach ($learnings as $l) {
            $l->username = DB::table('users')->where('id',$l->user_id)->value('name');
            $l->sub_category = DB::table('learning_sub_categories')->where('id',$l->subcategory_id)->value('name');
        }
        return compact('learnings');
    }

    public function getLearning($id)
    {
        $learning = Upload::find($id);
        return compact('learning');
    }

    public function getLearningByCategory(Request $request){
        $sub_categories = LearningSubcategory::where('category_id', $request->id)->get();
        $ids = array();
        foreach($sub_categories as $s){
            array_push($ids, $s->id);
        }
        
        $learnings = Upload::whereIn('subcategory_id',$ids)->where('status',$request->status)->get();
        foreach ($learnings as $l) {
            $l->username = DB::table('users')->where('id',$l->user_id)->value('name');
            $l->sub_category = DB::table('learning_sub_categories')->where('id',$l->subcategory_id)->value('name');
        }
        return compact('learnings','sub_categories');
    }

    public function getLearningBySubCategory(Request $request){
        
        $learnings = Upload::where('subcategory_id',$request->id)->where('status', $request->status)->get();
        foreach ($learnings as $l) {
            $l->username = DB::table('users')->where('id',$l->user_id)->value('name');
            $l->sub_category = DB::table('learning_sub_categories')->where('id',$l->subcategory_id)->value('name');
        }
        return compact('learnings');
    }

    public function approveLearning(Request $request){
        $learning = Upload::find($request->id);
        $learning->status = 1;
        $learning->save();
        return "Approve Pembelajaran Berhasil";
    }

    public function rejectLearning(Request $request){
        $learning = Upload::find($request->id);
        $learning->delete();
        // $learning->save();
        return "Reject Pembelajaran Berhasil";
    }
}
