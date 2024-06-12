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
            'name'=>'Danielsonz',
            'role'=>'admin',
            'email'=>'d@gmail.com',
            'password'=>bcrypt('d'),
            'remember_token'=>'1231231231',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'profile_image'=>'/storage/images/Remuru.png',
            'no_req'=>'6043340633',
            'lokasi'=>'',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'deskripsi'=> 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
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
            'lokasi'=>'',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
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
            'lokasi'=>'',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]);

        DB::table('users')->insert([
            'name' => 'Christian',
            'email' => 'christian@gmail.com',
            'password' => bcrypt('christian!2'),
            'remember_token'=>'8312398',
            'jenis_kelamin'=>'pria',
            'umur'=>'21',
            'nomor_telepon'=>'121031892381923',
            'role'=>'lembaga',
            'profile_image'=>'/storage/images/ANto.jpeg',
            'no_req'=>'6043340633',
            'lokasi'=>'',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'deskripsi'=>'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.1123653,
            'longitude'=>106.7437988
        ]);
        DB::table('users')->insert([
            'name' => 'Teach For Indonesia',
            'email' => 'tfi@email',
            'password' => bcrypt('tfi'),
            'remember_token'=>'831239812',
            'jenis_kelamin'=>null,
            'umur'=>null,
            'nomor_telepon'=>'021 534 5830 ',
            'role'=>'lembaga',
            'profile_image'=>null,
            'no_req'=>'6043340633',
            'lokasi'=>'Jl. Kebon Jeruk Raya No. 27, Kebon Jeruk, Jakarta Barat, 11530, INDONESIA',
            'penanggung_jawab'=>'',
            'bank'=>'BCA',
            'status'=> 1,
            'deskripsi'=> 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22',
            'latitude'=>-6.2003229,
            'longitude'=>106.7805351
        ]);

    }
}
