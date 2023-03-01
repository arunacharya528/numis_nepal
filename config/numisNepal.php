<?php

return [
    'currency' => "Rs.",
    'redirect' => [
        'cat-map' => [
            'name' => 'cat-map',
            'namespace' => 'admin.categories.index',
            'queryParams' => ['map' => true]
        ],
        'order-show' => [
            'name' => 'order-show',
            'namespace' => 'admin.orders.show',
            'queryParams' => []
        ]
    ]
];
