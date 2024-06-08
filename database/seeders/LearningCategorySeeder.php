<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LearningCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('learning_categories')->insert([
            'name'=>'Bencana Alam',
        ]);
        DB::table('learning_categories')->insert([
            'name'=>'Penyakit',
        ]);
    }
}
