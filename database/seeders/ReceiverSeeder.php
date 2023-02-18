<?php

namespace Database\Seeders;

use App\Models\Receiver;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceiverSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Receiver::factory(10)->create();
    }
}
