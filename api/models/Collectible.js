const mongoose = require("mongoose")

const Collectible = new mongoose.Schema({
    description: { type: String },
    quality: { type: String }
})

mongoose.model("Collectible", Collectible);
module.exports = Collectible;