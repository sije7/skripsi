<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('transactions')->insert([
            'user_id'=>4,
            'crowdfunding_id'=>1,
            'fund'=>1300000,
            'image'=>'/storage/images/testmbanking.jpg',
            'status'=>1,
        ]);
        DB::table('transactions')->insert([
            'user_id'=>3,
            'crowdfunding_id'=>2,
            'fund'=>799999,
            'image'=>'/storage/images/testmbanking.jpg',
            'status'=>1,
        ]);
        DB::table('transactions')->insert([
            'user_id'=>5,
            'crowdfunding_id'=>5,
            'fund'=>3500000,
            'image'=>'/storage/images/testmbanking.jpg',
            'status'=>1,
        ]);
        DB::table('transactions')->insert([
            'user_id'=>6,
            'crowdfunding_id'=>1,
            'fund'=>2500000,
            'image'=>'/storage/images/testmbanking.jpg',
            'status'=>1,
        ]);
        DB::table('transactions')->insert([
            'user_id'=>5,
            'crowdfunding_id'=>2,
            'fund'=>100000,
            'image'=>'/storage/images/testmbanking.jpg',
            'status'=>1,
        ]);
        
        DB::table('transactions')->insert([
            'user_id'=>4,
            'crowdfunding_id'=>5,
            'fund'=>12500000,
            'image'=>'/storage/images/testmbanking.jpg',
            'status'=>1,
        ]);
        DB::table('transactions')->insert([
            'user_id'=>7,
            'crowdfunding_id'=>1,
            'fund'=>13000000,
            'image'=>'/storage/images/testmbanking.jpg',
            'status'=>1,
        ]);
        DB::table('transactions')->insert([
            'user_id'=>5,
            'crowdfunding_id'=>2,
            'fund'=>120000,
            'image'=>'/storage/images/testmbanking.jpg',
            'status'=>1,
        ]);
    }
}
