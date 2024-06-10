<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UploadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('uploads')->insert([
            'user_id'=>'1',
            'subcategory_id'=>'1',
            'title'=>'Title Test',
            'upload_video'=>'/storage/videos/videoplayback.mp4',
            'title_description'=>'Title Description',
            'description'=>'Contents',
            'upload_image'=>'/storage/images/login.jpg',
            'thumbnail'=>'/storage/images/login.jpg',
            'status'=>1,
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
        ]);
        DB::table('uploads')->insert([
            'user_id'=>'1',
            'subcategory_id'=>'1',
            'title'=>'Title Test',
            'upload_video'=>'/storage/videos/videoplayback.mp4',
            'title_description'=>'Title Description',
            'description'=>'Contents',
            'upload_image'=>'/storage/images/login.jpg',
            'thumbnail'=>'/storage/images/login.jpg',
            'status'=>1,
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
        ]);
    }
}
