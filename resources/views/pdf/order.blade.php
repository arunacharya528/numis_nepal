@inject('Price', '\App\Http\Controllers\OrderController')

<style>
    body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 12px;
    }

    #header {
        text-align: center;
        padding: 3rem 0;
    }

    #header header{
        font-weight: bold;
        font-size: 2rem;
    }

    #table {
        width: 100%;
        border-collapse: collapse;
    }

    #table thead {
        background-color: black;
        color: white;
    }

    #table th,
    #table td {
        padding: 10px 5px;
        min-width: 20px;
    }

    .align-left {
        text-align: left;
    }

    .align-right {
        text-align: right;
    }

    .float-right {
        float: right;
    }

    .summary {
        padding: 0.5rem 0.2rem;
        border-bottom: 1px solid gray;
    }
</style>
<div id="header">
    <header>
        Invoice
    </header>
    <div style="text-align: center">Date: {{ $order->ordered_at }}</div>
</div>

<div>
    <div>
        <b style="display: inline;">Bill To:</b>
        <b style="display: inline;float: right;">Invoive No.: {{ $order->id }}</b>
    </div>
    <div>
        <b style="display: inline;">{{ $order->receiver->name }}</b>
    </div>
    <div>
        <span style="display: inline;">Contact No.:{{ $order->receiver->contact }}</span>
    </div>
</div>

<table id="table">
    <thead>
        <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price/unit</th>
            <th>Discount</th>
            <th>Amount</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($order->orderItems as $item)
            <tr>
                <td class="align-right">{{ $loop->index + 1 }}</td>
                <td class="align-left">{{ $item->product->name }}</td>
                <td class="align-right">{{ $item->quantity }}</td>
                <td class="align-right">{{ config('numisNepal.currency') }}{{ $item->product->price }}</td>
                <td class="align-right">
                    {{ config('numisNepal.currency') }}{{ $Price->discountedPrice($item->product->price, $item->discount_percent) * $item->quantity }}
                </td>
                <td class="align-right">{{ config('numisNepal.currency') }}{{ $item->amount }}</td>
            </tr>
        @endforeach
        <tr style="font-weight: bold; border-top: 1px solid gray; border-bottom:1px solid gray;">
            <td></td>
            <td></td>
            <td></td>
            <td class="align-right">Total</td>
            <td class="align-right">{{ config('numisNepal.currency') }}{{ $order->discount }}</td>
            <td class="align-right">{{ config('numisNepal.currency') }}{{ $order->sub_total + $order->discount }}</td>
        </tr>
    </tbody>
</table>

<div>
    <div>

    </div>
    <div style="float: right; width: 50%">
        <div class="summary">
            <span style="display: inline;">Sub Total</span>
            <span style="display: inline;float: right;">{{ config('numisNepal.currency') }}{{ $order->sub_total + $order->discount }}</span>
        </div>
        <div class="summary">
            <span style="display: inline;">Discount</span>
            <span style="display: inline;float: right;">{{ config('numisNepal.currency') }}{{ $order->discount }}</span>
        </div>
        <div class="summary">
            <span style="display: inline;">Shipping Price</span>
            <span style="display: inline;float: right;">{{ config('numisNepal.currency') }}{{ $order->shipping_price }}</span>
        </div>
        <div class="summary">
            <span style="display: inline;">Total</span>
            <span style="display: inline;float: right;">{{ config('numisNepal.currency') }}{{ $order->sub_total+$order->shipping_price }}</span>
        </div>
    </div>
</div>
