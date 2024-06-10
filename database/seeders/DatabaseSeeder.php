<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\LearningCategory;
use App\Models\ProgressDonation;
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
        $this->call(TransactionSeeder::class);
        $this->call(CategorySeeder::class);
        $this->call(SubCategorySeeder::class);
        $this->Call(ItemSeeder::class);
        $this->call(DonationSeeder::class);
        $this->call(ProgressDonationSeeder::class);
        $this->call(LearningCategorySeeder::class);
        $this->call(LearningSubCategorySeeder::class);
        $this->call(UploadSeeder::class);
    }
}
