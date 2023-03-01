<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(),
            'description' => $this->faker->words(200, true),
            'quantity' => random_int(1, 100),
            'price' => $this->faker->randomElement([300, 500, 800, 1100]),
            'quality'=>$this->faker->randomElement(Product::QUALITY)
        ];
    }
}
