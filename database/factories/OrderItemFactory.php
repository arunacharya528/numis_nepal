<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id' => $this->faker->randomElement(Product::pluck('id')),
            'order_id' => $this->faker->randomElement(Order::pluck('id')),
            'quantity' => $this->faker->randomElement([5, 10, 50, 20]),
            'discount_percent' => random_int(0, 10),
            'amount' => random_int(200, 500)
        ];
    }
}
