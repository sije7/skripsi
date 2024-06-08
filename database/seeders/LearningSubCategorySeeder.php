<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LearningSubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('learning_sub_categories')->insert([
            'category_id'=>1,
            'name'=>'Banjir'
        ]);
        DB::table('learning_sub_categories')->insert([
            'category_id'=>1,
            'name'=>'Gempa Bumi'
        ]);
        DB::table('learning_sub_categories')->insert([
            'category_id'=>1,
            'name'=>'Gunung Meletus'
        ]);
        DB::table('learning_sub_categories')->insert([
            'category_id'=>1,
            'name'=>'Tanah Longsor'
        ]);
        DB::table('learning_sub_categories')->insert([
            'category_id'=>1,
            'name'=>'Kebakaran Hutan'
        ]);

        DB::table('learning_sub_categories')->insert([
            'category_id'=>2,
            'name'=>'Diare'
        ]);
        DB::table('learning_sub_categories')->insert([
            'category_id'=>2,
            'name'=>'Luka Bakar'
        ]);
        DB::table('learning_sub_categories')->insert([
            'category_id'=>2,
            'name'=>'Penyakit Kulit'
        ]);
        DB::table('learning_sub_categories')->insert([
            'category_id'=>2,
            'name'=>'Muntah'
        ]);
    }
}
