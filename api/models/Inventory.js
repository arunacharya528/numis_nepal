const mongoose = require("mongoose")

const Inventory = new mongoose.Schema({
    collectible: { type: mongoose.Schema.ObjectId, required: true },
    buyingPrice: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, required: true },
    client: { type: mongoose.Schema.ObjectId, required: true },
    type: { type: String, required: true },
    date: { type: Date, required: true }
})

mongoose.model("Inventory", Inventory)
// module.exports = Inventory;