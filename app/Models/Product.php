<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'quantity', 'price'];

    public function productTheme()
    {
        return $this->hasMany(ProductTheme::class, 'product_id');
    }

    public function themes()
    {
        return $this->belongsToMany(Theme::class,'product_themes');
    }
}
