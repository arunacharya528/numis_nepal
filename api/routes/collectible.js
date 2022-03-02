const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

const Collectible = mongoose.model("Collectible");
const Client = mongoose.model("Client");
const Inventory = mongoose.model("Inventory");

var ObjectID = require('mongodb').ObjectID;


router.get("/collectible", (req, res, next) => {
    Collectible
        .find({})
        .then(result => res.status(200).send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })
})

router.post("/collectible", (req, res, next) => {

    const { description, quality } = req.body;

    Collectible
        .create({ description, quality })
        .then(result => res.status(200).send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        });
})

router.get("/collectible/:collectible_id", (req, res, next) => {
    Collectible
        .findOne({ _id: req.params.collectible_id })
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })
})

router.put("/collectible/:collectible_id", (req, res, next) => {
    const { description, quality } = req.body;
    Collectible
        .findById(req.params.collectible_id, (err, data) => {
            data.description = description;
            data.quality = quality;
            data.save()
                .then(result => res.status(200).send(result))
                .catch(err => {
                    console.log(err);
                    res.status(500).send(err.message);
                });
        })
})

module.exports = router;
