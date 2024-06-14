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
        //makanan
        DB::table('items')->insert([
            'name'=>'Mie Instant',
            'subcategory_id'=>'1',
            'currency'=>'Bungkus',
        ]);
        DB::table('items')->insert([
            'name'=>'Beras',
            'subcategory_id'=>'1',
            'currency'=>'Kilogram',
        ]);
        DB::table('items')->insert([
            'name'=>'Makanan Ringan',
            'subcategory_id'=>'1',
            'currency'=>'Bungkus',
        ]);
        DB::table('items')->insert([
            'name'=>'Ikan Kaleng',
            'subcategory_id'=>'1',
            'currency'=>'Kaleng',
        ]);
        DB::table('items')->insert([
            'name'=>'Biskuit',
            'subcategory_id'=>'1',
            'currency'=>'Bungkus',
        ]);
        DB::table('items')->insert([
            'name'=>'Sereal',
            'subcategory_id'=>'1',
            'currency'=>'Bungkus',
        ]);


        //minuman
        DB::table('items')->insert([
            'name'=>'Air Mineral',
            'subcategory_id'=>'2',
            'currency'=>'Liter',
        ]);
        DB::table('items')->insert([
            'name'=>'Kopi Instan',
            'subcategory_id'=>'2',
            'currency'=>'Bungkus',
        ]);
        DB::table('items')->insert([
            'name'=>'Teh Bubuk',
            'subcategory_id'=>'2',
            'currency'=>'Bungkus',
        ]);
        DB::table('items')->insert([
            'name'=>'Susu Cair',
            'subcategory_id'=>'2',
            'currency'=>'Liter',
        ]);
        DB::table('items')->insert([
            'name'=>'Susu Bubuk',
            'subcategory_id'=>'2',
            'currency'=>'Kilogram',
        ]);
        DB::table('items')->insert([
            'name'=>'Susu Bayi',
            'subcategory_id'=>'2',
            'currency'=>'Kilogram',
        ]);

        //obat-obatan
        DB::table('items')->insert([
            'name'=>'Paracetamol',
            'subcategory_id'=>'3',
            'currency'=>'Tablet',
        ]);
        DB::table('items')->insert([
            'name'=>'Obat Batuk Sirup',
            'subcategory_id'=>'3',
            'currency'=>'Botol',
        ]);
        DB::table('items')->insert([
            'name'=>'Vitamin C',
            'subcategory_id'=>'3',
            'currency'=>'Tablet',
        ]);
        DB::table('items')->insert([
            'name'=>'Obat Diare',
            'subcategory_id'=>'3',
            'currency'=>'Tablet',
        ]);
        DB::table('items')->insert([
            'name'=>'Obat Diare',
            'subcategory_id'=>'3',
            'currency'=>'Tablet',
        ]);



        //pakaian
        DB::table('items')->insert([
            'name'=>'Baju',
            'subcategory_id'=>'4',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Celana',
            'subcategory_id'=>'4',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Jaket',
            'subcategory_id'=>'4',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Topi',
            'subcategory_id'=>'4',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Sepatu',
            'subcategory_id'=>'4',
            'currency'=>'Pasang',
        ]);

        //peralatan medis
        DB::table('items')->insert([
            'name'=>'Sarung Tangan',
            'subcategory_id'=>'5',
            'currency'=>'Pasang',
        ]);
        DB::table('items')->insert([
            'name'=>'Masker',
            'subcategory_id'=>'5',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Alkohol',
            'subcategory_id'=>'5',
            'currency'=>'Liter',
        ]);
        DB::table('items')->insert([
            'name'=>'Thermometer',
            'subcategory_id'=>'5',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Antiseptic',
            'subcategory_id'=>'5',
            'currency'=>'Liter',
        ]);

        //Peralatan rumah tangga
        DB::table('items')->insert([
            'name'=>'Sapu',
            'subcategory_id'=>'6',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Kipas Angin',
            'subcategory_id'=>'6',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Panci',
            'subcategory_id'=>'6',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Peralatan Makan',
            'subcategory_id'=>'6',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Lampu LED',
            'subcategory_id'=>'6',
            'currency'=>'Buah',
        ]);

        //mainan
        DB::table('items')->insert([
            'name'=>'Buku',
            'subcategory_id'=>'7',
            'currency'=>'Buah',
        ]);
        DB::table('items')->insert([
            'name'=>'Mainan',
            'subcategory_id'=>'7',
            'currency'=>'Buah',
        ]);
    }
}
