<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = ['receiver_id', 'order_status_id'];

    public function receiver()
    {
        return $this->belongsTo(Receiver::class);
    }

    public function orderStatus()
    {
        return $this->belongsTo(OrderStatus::class);
    }
}
