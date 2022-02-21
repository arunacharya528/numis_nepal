const mongoose = require("mongoose")

const Client = new mongoose.Schema({
    name: { type: String, required: true },
    contact: { type: String },
    description: { type: String }
})

mongoose.model("Client", Client);
module.exports = Client;