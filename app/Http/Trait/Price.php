<?php

namespace App\Http\Trait;

trait Price
{
    public function discountedPrice($price, $discount_percent)
    {
        return (0.01 * $discount_percent * $price);
    }

    public function priceAfterDiscount($price, int $discount_percent)
    {
        return $price - $this->discountedPrice($price,$discount_percent);
    }

    public function calculateTotal(int $quantity, $priceWithoutDiscount, int $discount_percent)
    {
        return $this->priceAfterDiscount($priceWithoutDiscount * $quantity, $discount_percent);
    }

}
