<?php

namespace Database\Factories;

use App\Models\OrderStatus;
use App\Models\Receiver;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'receiver_id' => $this->faker->randomElement(Receiver::pluck('id')),
            'order_status_id' => $this->faker->randomElement(OrderStatus::pluck('id')),
            'sub_total' => random_int(1000, 5000),
            'discount' => random_int(500, 1000)
        ];
    }
}
