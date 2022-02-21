const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const router = express.Router();

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, useUnifiedTopology:
        true
})

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());


app.use(cors())
app.use(express.static('public'))

app.get("/", (req, res, next) => {
    res.send("You are listening to api of numis nepal");
})

require("./models/Client");
require("./models/Collectible");
require("./models/Inventory");


const inventory = require("./routes/inventory.js");
app.use("/api", inventory);
const client = require("./routes/client.js");
app.use("/api", client);
const collectible = require("./routes/collectible.js");
app.use("/api", collectible);


const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})