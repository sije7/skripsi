<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CrowdfundingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('1'),
            'title'=>'Gunung Meletus Kabupaten Merapi',
            'description'=>'Pellentesque ac tortor mi. Aenean pulvinar vitae augue scelerisque blandit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris massa erat, porta vel lacinia et, dictum eu nisi. Suspendisse auctor sit amet erat eget viverra. Aliquam erat volutpat. Aenean rhoncus sit amet turpis nec venenatis. Vestibulum laoreet ex felis. In accumsan varius est, ac tristique arcu molestie sit amet. Praesent vulputate aliquam malesuada. Vestibulum eu enim quis massa gravida consequat. Vivamus consectetur tortor laoreet, tempus tortor non, posuere sem. Nulla eget lectus nunc. Nulla erat ex, rutrum ut rutrum eget, semper venenatis sem. Sed lobortis finibus ante quis auctor.',
            'image'=>'/storage/images/meletup.jpg',
            'fund'=>(123),
            'target'=>(123),
            'deadline'=> 5,
            'status'=> 1,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Jl. Petemon IV No.32-A, RT 014/RW 008 (Gang Sebelah Bank BCA), Kel. Petemon, Kec. Sawahan, Kota Surabaya, Jawa Timur, 60252',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('1'),
            'title'=>'Banjir Bandang Tangerang Selatan',
            'description'=>'Donec tempor mauris lectus, vestibulum viverra augue cursus eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean placerat mauris id est vehicula, posuere volutpat dui congue. Quisque id sapien elit. Quisque sed posuere massa, vel sollicitudin metus. Nulla facilisi. Phasellus ultrices quis sem sed sagittis. Sed ullamcorper vel metus eu interdum. Morbi eu viverra sapien. Praesent posuere mi eget ullamcorper auctor.',
            'image'=>'/storage/images/banjir.jpg',
            'fund'=>(200000),
            'target'=>(400000),
            'status'=> 1,
            'deadline'=> 6,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Jl. Petemon IV No.32-A, RT 014/RW 008 (Gang Sebelah Bank BCA), Kel. Petemon, Kec. Sawahan, Kota Surabaya, Jawa Timur, 60252',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('1'),
            'title'=>'Kebakaran Hutan Bandung Utara',
            'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu luctus elit. Etiam vel efficitur elit. Donec id iaculis nisl, sit amet maximus lorem. Praesent non arcu sem. Integer molestie sem eu neque tempus, et condimentum quam posuere. Pellentesque sem elit, tristique a nunc ac, luctus hendrerit metus. Duis augue justo, interdum vitae sapien in, cursus convallis felis. Nullam bibendum mauris vel dui dictum, eu eleifend felis sagittis. Pellentesque vitae ultricies metus. Nunc ullamcorper, arcu et volutpat tincidunt, ante nisl lacinia est, quis porttitor purus ipsum quis orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis vulputate dolor.',
            'image'=>'/storage/images/bakar.jpg',
            'fund'=>0,
            'target'=>(100000),
            'deadline'=> 3,
            'status'=> 0,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Jl. Petemon IV No.32-A, RT 014/RW 008 (Gang Sebelah Bank BCA), Kel. Petemon, Kec. Sawahan, Kota Surabaya, Jawa Timur, 60252',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('1'),
            'title'=>'Gempa Bumi Kota Emas',
            'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu luctus elit. Etiam vel efficitur elit. Donec id iaculis nisl, sit amet maximus lorem. Praesent non arcu sem. Integer molestie sem eu neque tempus, et condimentum quam posuere. Pellentesque sem elit, tristique a nunc ac, luctus hendrerit metus. Duis augue justo, interdum vitae sapien in, cursus convallis felis. Nullam bibendum mauris vel dui dictum, eu eleifend felis sagittis. Pellentesque vitae ultricies metus. Nunc ullamcorper, arcu et volutpat tincidunt, ante nisl lacinia est, quis porttitor purus ipsum quis orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis vulputate dolor.',
            'image'=>'/storage/images/gempa1.jpg',
            'fund'=>0,
            'target'=>(100000000),
            'deadline'=> 3,
            'status'=> 0,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Jl. Petemon IV No.32-A, RT 014/RW 008 (Gang Sebelah Bank BCA), Kel. Petemon, Kec. Sawahan, Kota Surabaya, Jawa Timur, 60252',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('4'),
            'title'=>'Banjir Bandang Kota Jakarta Utara',
            'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu luctus elit. Etiam vel efficitur elit. Donec id iaculis nisl, sit amet maximus lorem. Praesent non arcu sem. Integer molestie sem eu neque tempus, et condimentum quam posuere. Pellentesque sem elit, tristique a nunc ac, luctus hendrerit metus. Duis augue justo, interdum vitae sapien in, cursus convallis felis. Nullam bibendum mauris vel dui dictum, eu eleifend felis sagittis. Pellentesque vitae ultricies metus. Nunc ullamcorper, arcu et volutpat tincidunt, ante nisl lacinia est, quis porttitor purus ipsum quis orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis vulputate dolor.',
            'image'=>'/storage/images/banjir1.jpg',
            'fund'=>(200000),
            'target'=>(400000),
            'deadline'=> 3,
            'status'=> 1,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Jl. Petemon IV No.32-A, RT 014/RW 008 (Gang Sebelah Bank BCA), Kel. Petemon, Kec. Sawahan, Kota Surabaya, Jawa Timur, 60252',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
        DB::table('crowdfundings')->insert(([
            'user_id'=> ('1'),
            'title'=>'Gempa Bumi Desa Jarilo',
            'description'=>'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eu luctus elit. Etiam vel efficitur elit. Donec id iaculis nisl, sit amet maximus lorem. Praesent non arcu sem. Integer molestie sem eu neque tempus, et condimentum quam posuere. Pellentesque sem elit, tristique a nunc ac, luctus hendrerit metus. Duis augue justo, interdum vitae sapien in, cursus convallis felis. Nullam bibendum mauris vel dui dictum, eu eleifend felis sagittis. Pellentesque vitae ultricies metus. Nunc ullamcorper, arcu et volutpat tincidunt, ante nisl lacinia est, quis porttitor purus ipsum quis orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque quis vulputate dolor.',
            'image'=>'/storage/images/gempa2.jpg',
            'fund'=>0,
            'target'=>(500000),
            'status'=> 0,
            'deadline'=> 3,
            'nama_rekening'=>'Danielson',
            'no_rekening'=>'6020910274',
            'bank'=>'BCA',
            'location'=>'Jl. Petemon IV No.32-A, RT 014/RW 008 (Gang Sebelah Bank BCA), Kel. Petemon, Kec. Sawahan, Kota Surabaya, Jawa Timur, 60252',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'

        ]));
    }
}
