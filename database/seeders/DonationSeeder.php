<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DonationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('donations')->insert([
            'user_id'=>'4',
            'pemohon_id'=>'1',
            'status'=>3,
            'deadline'=>19,
            'title'=>'Banjir Bandang Kota Jakarta Utara',
            'description'=>'Banjir besar melanda Jakarta Utara pada Senin pagi setelah hujan deras mengguyur ibu kota selama lebih dari 24 jam tanpa henti. Air setinggi lebih dari dua meter menggenangi ribuan rumah dan fasilitas umum, memaksa ribuan warga mengungsi ke tempat penampungan sementara. Jalan-jalan utama dan akses transportasi lumpuh total, menyebabkan kemacetan parah dan menghambat evakuasi serta distribusi bantuan. Tim penyelamat dan relawan bekerja keras mengevakuasi warga yang terjebak dan menyediakan kebutuhan dasar seperti makanan dan air bersih. Pihak berwenang telah mengeluarkan status darurat dan meminta bantuan nasional untuk menangani bencana ini. Kejadian ini menggarisbawahi perlunya perbaikan sistem drainase dan upaya mitigasi banjir yang lebih efektif di Jakarta Utara, untuk mencegah terulangnya tragedi serupa di masa depan.',
            'location'=>'Jakarta Utara',
            'image'=>'/storage/images/banjir1.jpg',
        ]);
        DB::table('donations')->insert([
            'user_id'=>'5',
            'pemohon_id'=>'1',
            'status'=>3,
            'deadline'=>19,
            'title'=>'Gempa Bumi Surabaya',
            'description'=>'Gempa dengan kekuatan 4,8 sr mengguncang Surabaya, mengakibatkan 10 rumah warga di desa Sangat Wangi rubuh.',
            'location'=>'Desa Sangat Wangi, Surabaya.',
            'image'=>'/storage/images/gempa_surabaya.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'6',
            'pemohon_id'=>'2',
            'status'=>1,
            'deadline'=>30,
            'title'=>'Gempa Bumi Bogor',
            'description'=>'Gempa dengan kekuatan 5,7 sr mengguncang Bogor, mengakibatkan 20 rumah warga di desa Bogor rubuh.',
            'location'=>'Desa Bogor, Bogor.',
            'image'=>'/storage/images/Gempa_Garut.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'11',
            'pemohon_id'=>'11',
            'status'=>1,
            'deadline'=>29,
            'title'=>'Gempa Bumi Cianjur',
            'description'=>'Gempa dengan kekuatan 6,7 sr mengguncang Cianjur, mengakibatkan 2 rumah warga di desa Sukaria rubuh dan 45 orang terluka.',
            'location'=>'Desa Sukaria, Cianjur.',
            'image'=>'/storage/images/gempa_cianjur.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'8',
            'pemohon_id'=>'8',
            'status'=>1,
            'deadline'=>19,
            'title'=>'Gempa Bumi Aceh',
            'description'=>'Gempa dengan kekuatan 9,7 sr mengguncang Aceh, mengakibatkan 200 rumah warga di desa Polalilu rubuh dan 356 orang terluka.',
            'location'=>'Desa Polalilu, Aceh.',
            'image'=>'/storage/images/Gempa_Aceh.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'9',
            'pemohon_id'=>'9',
            'status'=>1,
            'deadline'=>30,
            'title'=>'Gempa Bumi Tasikmalaya',
            'description'=>'Gempa dengan kekuatan 5,1 sr mengguncang Tasikmalaya, mengakibatkan 47 rumah warga di desa Sega rubuh dan 72 orang terluka.',
            'location'=>'Desa Sega, Tasikmalaya.',
            'image'=>'/storage/images/landslide.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'3',
            'pemohon_id'=>'2',
            'status'=>1,
            'deadline'=>30,
            'title'=>'Gempa Bumi Palembang',
            'description'=>'Gempa dengan kekuatan 3,2 sr mengguncang Palembang. Ratusan Warga diungsikan',
            'location'=>'Desa Bejo, Palembang.',
            'image'=>'/storage/images/gempa_palembang.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'4',
            'pemohon_id'=>'3',
            'status'=>2,
            'deadline'=>30,
            'title'=>'Gempa Bumi Papua',
            'description'=>'Gempa dengan kekuatan 5,5 sr mengguncang Fakfak. Ribuan warga mengalami musibah dan memerlukan segera pertolongan',
            'location'=>'Desa Fakfak, Papua.',
            'image'=>'/storage/images/gempa_papua.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'10',
            'pemohon_id'=>'10',
            'status'=>3,
            'deadline'=>30,
            'title'=>'Gempa Bumi Maluku',
            'description'=>'Gempa dengan kekuatan 8,2 sr mengguncang Maluku. Pemerintah segera mengirimkan bantuan tim SAR',
            'location'=>'Desa Maluku, Maluku.',
            'image'=>'/storage/images/gempa_maluku.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'5',
            'pemohon_id'=>'5',
            'status'=>3,
            'deadline'=>30,
            'title'=>'Gempa Bumi Manado',
            'description'=>'Gempa dengan kekuatan 3,2 sr mengguncang Desa Remto. Puluhan keluarga diungsikan',
            'location'=>'Desa Remto, Manado.',
            'image'=>'/storage/images/gempa_manado.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'7',
            'pemohon_id'=>'2',
            'status'=>1,
            'deadline'=>30,
            'title'=>'Gempa Bumi Bali',
            'description'=>'Gempa dengan kekuatan 6,8 sr mengguncang Ubud. Tim SAR aktif mengevakuasi warga',
            'location'=>'Desa Ubud, Bali.',
            'image'=>'/storage/images/gempa_bali.jpg',
        ]);

        DB::table('donations')->insert([
            'user_id'=>'9',
            'pemohon_id'=>'2',
            'status'=>1,
            'deadline'=>30,
            'title'=>'Gempa Bumi Makassar',
            'description'=>'Gempa dengan kekuatan 5,6 sr mengguncang Seragen. Puluhan rumah warga rusak dan 10 keluarga diungsikan',
            'location'=>'Desa Seragen, Makassar.',
            'image'=>'/storage/images/gempa_makassar.jpg',
        ]);
    }
}
