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
            'user_id'=>'1',
            'pemohon_id'=>'1',
            'status'=>2,
            'deadline'=>19,
            'title'=>'Banjir Bandang Kota Jakarta Utara',
            'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu luctus elit. Etiam vel efficitur elit. Donec id iaculis nisl, sit amet maximus lorem. Praesent non arcu sem. Integer molestie sem eu neque tempus, et condimentum quam posuere. Pellentesque sem elit, tristique a nunc ac, luctus hendrerit metus. Duis augue justo, interdum vitae sapien in, cursus convallis felis. Nullam bibendum mauris vel dui dictum, eu eleifend felis sagittis. Pellentesque vitae ultricies metus. Nunc ullamcorper, arcu et volutpat tincidunt, ante nisl lacinia est, quis porttitor purus ipsum quis orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis vulputate dolor.',
            'location'=>'Jl. Petemon IV No.32-A, RT 014/RW 008 (Gang Sebelah Bank BCA), Kel. Petemon, Kec. Sawahan, Kota Surabaya, Jawa Timur, 60252',
            'image'=>'/storage/images/banjir1.jpg',
        ]);
        DB::table('donations')->insert([
            'user_id'=>'1',
            'pemohon_id'=>'1',
            'status'=>2,
            'deadline'=>19,
            'title'=>'Gempa Bumi Surabaya',
            'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu luctus elit. Etiam vel efficitur elit. Donec id iaculis nisl, sit amet maximus lorem. Praesent non arcu sem. Integer molestie sem eu neque tempus, et condimentum quam posuere. Pellentesque sem elit, tristique a nunc ac, luctus hendrerit metus. Duis augue justo, interdum vitae sapien in, cursus convallis felis. Nullam bibendum mauris vel dui dictum, eu eleifend felis sagittis. Pellentesque vitae ultricies metus. Nunc ullamcorper, arcu et volutpat tincidunt, ante nisl lacinia est, quis porttitor purus ipsum quis orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis vulputate dolor.',
            'location'=>'Jl. Petemon IV No.32-A, RT 014/RW 008 (Gang Sebelah Bank BCA), Kel. Petemon, Kec. Sawahan, Kota Surabaya, Jawa Timur, 60252',
            'image'=>'/storage/images/gempa2.jpg',
        ]);
    }
}
