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

        \App\Models\User::factory(30)->create();
        
        DB::table('users')->insert(([
            'name'=>'Danielson',
            'role'=>'admin',
            'email'=>'d@gmail.com',
            'password'=>bcrypt('d'),
            'remember_token'=>'1231231231',
            'email_verified_at'=>'2024-05-10 14:43:22',
            'created_at'=>'2024-05-10 14:43:22',
            'updated_at'=>'2024-05-10 14:43:22'
        ]));
    }
}
