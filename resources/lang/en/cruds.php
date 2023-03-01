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
            'price_helper' => "Enter selling price of product.",
            'theme' => "Theme",
            'theme_helper' => "Select as many theme of this product as you like.",
            'quality' => "Quality",
            'quality_helper' => "Select quality of the product"
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
    ],
    'orderManagement' => [
        'title' => "Order Management",
        'title_singular' => "Order Management"
    ],
    'order' => [
        'title' => "Orders",
        'title_singular' => 'Order',
        'fields' => [
            'receiver' => "Receiver",
            'receiver_helper' => "Enter name of the person who will receive product.",
            'receiver_id' => "Existing Receiver",
            'receiver_id_helper' => "Select among the old receivers.",
            'contact' => "Contact",
            'contact_helper' => "Enter contact detail of the receiver",
            'status' => "Status",
            'status_helper' => "Select status of order",
            'ordered_at' => "Ordered At",
            'sub_total' => "Sub Total",
            'discount' => "Discount",
            'total' => "Total",
            'shipping_price' => "Shipping Price",
            'shipping_price_helper' => "Enter shipping price"
        ]
    ],
    'orderStatus' => [
        'title' => "Order Status",
        'title_singular' => "Order Status",
        'fields' => [
            'title' => "Title",
            'title_helper' => "Enter title of order status"
        ]
    ],
    'orderItems' => [
        'title' => "Order Items",
        'title_singular' => "Order Item",
        'fields' => [
            'product_id' => "Product",
            'product_id_helper' => "Select a product",
            'quantity' => "Quantity",
            'quantity_helper' => "Enter quantity of order",
            'discount_percent' => "Discount percent",
            'discount_percent_helper' => "Enter discount percent that you are willing to offer",
            'amount' => "Amount"
        ]
    ]
];
