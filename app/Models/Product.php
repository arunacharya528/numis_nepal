<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'quantity', 'price','quality','category_id'];

    const QUALITY  = [
        'UNC' => "UNC",
        'aUNC' => "aUNC",
        'XF+' => "XF+",
        'XF' => "XF",
        'F' => "F",
        'Used' => "Used",
        'Poor' => "Poor",
    ];

    public function productTheme()
    {
        return $this->hasMany(ProductTheme::class, 'product_id');
    }

    public function themes()
    {
        return $this->belongsToMany(Theme::class, 'product_themes');
    }
}
