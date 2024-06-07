<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProgressDonationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('progress_donations')->insert([
            'item_id'=>'1',
            'status'=>0,
            'donation_id'=>1,
            'quantity'=>50
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>'1',
            'status'=>1,
            'donation_id'=>1,
            'quantity'=>30
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>'2',
            'status'=>0,
            'donation_id'=>1,
            'quantity'=>30
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>1,
            'donation_id'=>2,
            'quantity'=>10
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>0,
            'donation_id'=>2,
            'quantity'=>50
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>1,
            'donation_id'=>2,
            'quantity'=>30
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>1,
            'donation_id'=>2,
            'quantity'=>10
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>0,
            'donation_id'=>3,
            'quantity'=>50
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>0,
            'donation_id'=>3,
            'quantity'=>30
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>0,
            'donation_id'=>3,
            'quantity'=>10
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>0,
            'donation_id'=>4,
            'quantity'=>50
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>0,
            'donation_id'=>4,
            'quantity'=>30
        ]);
        DB::table('progress_donations')->insert([
            'item_id'=>2,
            'status'=>0,
            'donation_id'=>4,
            'quantity'=>10
        ]);
    }
}
