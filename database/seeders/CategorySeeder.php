<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 5; $i++) {
            $parent = Category::factory()->create();

            for ($j = 0; $j < 5; $j++) {
                Category::factory()->create(['parent_id' => $parent->id]);
            }
        }
    }
}
