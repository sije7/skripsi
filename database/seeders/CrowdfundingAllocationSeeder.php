<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CrowdfundingAllocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('crowdfunding_allocations')->insert([
            'crowdfunding_id' => '1',
            'allocation'=>'Pembangunan Tempat Evakuasi Darurat',
            'fund'=>'100000'
        ]);
        DB::table('crowdfunding_allocations')->insert([
            'crowdfunding_id' => '1',
            'allocation'=>'Penataan Kebocoran',
            'fund'=>'11000'
        ]);
        DB::table('crowdfunding_allocations')->insert([
            'crowdfunding_id' => '1',
            'allocation'=>'Pemeliharaan Sumber Air',
            'fund'=>'12000'
        ]);
    }
}
