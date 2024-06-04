<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            'name'=>'Mie Instant',
            'subcategory_id'=>'1',
            'currency'=>'Bungkus',
        ]);
        DB::table('items')->insert([
            'name'=>'Air Mineral',
            'subcategory_id'=>'2',
            'currency'=>'Botol',
        ]);
        DB::table('items')->insert([
            'name'=>'Baju Kaos',
            'subcategory_id'=>'4',
            'currency'=>'Buah',
        ]);
    }
}
