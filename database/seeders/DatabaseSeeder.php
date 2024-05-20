<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(CrowdfundingSeeder::class);
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
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]);

        // User::factory()->create([
        //     'name' => 'Danielson',
        //     'email' => 'danielson@gmail.com',
        //     'password' => bcrypt('danielson!2'),
        //     'remember_token' => Str::random(10),
        // ]);

        // User::factory()->create([
        //     'name' => 'Ervindo',
        //     'email' => 'ervindo@gmail.com',
        //     'password' => bcrypt('ervindo!2'),
        //     'remember_token' => Str::random(10),
        // ]);

        // User::factory()->create([
        //     'name' => 'Christian',
        //     'email' => 'christian@gmail.com',
        //     'password' => bcrypt('christian!2'),
        //     'remember_token' => Str::random(10),
        // ]);
    }
}
