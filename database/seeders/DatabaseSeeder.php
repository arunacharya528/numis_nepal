<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Product;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
        ]);

        $this->call([
            ProductSeeder::class,
            CategorySeeder::class,
            OrderStatusSeeder::class,
            ReceiverSeeder::class,
            OrderSeeder::class,
            OrderItemSeeder::class,
            ThemeSeeder::class
        ]);
    }
}
