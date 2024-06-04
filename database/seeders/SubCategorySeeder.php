<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Konsumsi
        DB::table('subcategories')->insert([
            'category_id'=>'1',
            'name'=>'Makanan'
        ]);
        DB::table('subcategories')->insert([
            'category_id'=>'1',
            'name'=>'Minuman'
        ]);
        DB::table('subcategories')->insert([
            'category_id'=>'1',
            'name'=>'Obat-obatan'
        ]);

        // Non-Konsumsi
        DB::table('subcategories')->insert([
            'category_id'=>'2',
            'name'=>'Pakaian'
        ]);
        DB::table('subcategories')->insert([
            'category_id'=>'2',
            'name'=>'Peralatan Medis'
        ]);
        DB::table('subcategories')->insert([
            'category_id'=>'2',
            'name'=>'Peralatan Rumah Tangga'
        ]);
        DB::table('subcategories')->insert([
            'category_id'=>'2',
            'name'=>'Mainan'
        ]);

    }
}
