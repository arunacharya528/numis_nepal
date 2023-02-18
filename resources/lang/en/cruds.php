<?php
return [
    'dashboard' => [
        'title' => "Dashboard",
        'title_singular' => "dashboard"
    ],
    'productManagement' => [
        'title' => "Product Management",
        'title_singular' => "Product Management",
    ],
    'product' => [
        'title' => "Products",
        'title_singular' => "Product",
        'fields' => [
            'name' => "Name",
            'name_helper' => "Enter name of the product.",
            'description' => "Description",
            'description_helper' => "Enter description of the product.",
            'quantity' => "Quantity",
            'quantity_helper' => "Enter available quantity of product.",
            'price' => "Price",
            'price_helper' => "Enter selling price of product."
        ]
    ],
    'category' => [
        'title' => "Categories",
        'title_singular' => "Category",
        'fields' => [
            'name' => "Name",
            'name_helper' => "Enter name of the category.",
            'parent_id' => "Parent",
            'parent_id_helper' => "Select parent of this category"
        ]
    ]
];
