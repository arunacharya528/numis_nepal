<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductTheme extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'theme_id'];
}
