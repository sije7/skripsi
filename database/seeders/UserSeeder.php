<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        // \App\Models\User::factory(30)->create();

        DB::table('users')->insert(([
            'name'=>'Danielson',
            'role'=>'admin',
            'email'=>'d@gmail.com',
            'password'=>bcrypt('d'),
            'remember_token'=>'1231231231',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'profile_image'=>'/storage/images/Remuru.png',
            'no_req'=>'6043340633',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]));

        DB::table('users')->insert([
            'name' => 'Danielson',
            'email' => 'danielson@gmail.com',
            'password' => bcrypt('danielson!2'),
            'remember_token'=>'4123132',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'role'=>'admin',
            'profile_image'=>'/storage/images/Remuru.png',
            'no_req'=>'6043340633',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]);

        DB::table('users')->insert([
            'name' => 'Ervindo',
            'email' => 'ervindo@gmail.com',
            'password' => bcrypt('ervindo!2'),
            'remember_token'=>'1231231',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'role'=>'user',
            'profile_image'=>'/storage/images/chainsaw.jpg',
            'no_req'=>'6043340633',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]);

        DB::table('users')->insert([
            'name' => 'Christian',
            'email' => 'christian@gmail.com',
            'password' => bcrypt('dhristian!2'),
            'remember_token'=>'8312398',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'role'=>'lembaga',
            'profile_image'=>'/storage/images/ANto.jpeg',
            'no_req'=>'6043340633',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]);

    }
}
