const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

const Collectible = mongoose.model("Collectible");
const Client = mongoose.model("Client");
const Inventory = mongoose.model("Inventory");

var ObjectID = require('mongodb').ObjectID;


router.get("/client", (req, res, next) => {
    Client
        .find({})
        .then(result => res.status(200).send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })
})

router.post("/client", (req, res, next) => {

    const { name, description, contact } = req.body;

    Client
        .create({ name, description, contact })
        .then(result => res.status(200).send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        });
})

router.get("/client/:client_id", (req, res, next) => {
    Client
        .findOne({ _id: req.params.client_id })
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })
})

router.put("/client/:client_id", (req, res, next) => { 
    const { name, contact, description } = req.body;
    // console.log(req.params,req.body)
    Client.findById(req.params.client_id, (err, data) => { 
        data.name = name;
        data.description = description;
        data.contact = contact;
        data.save()
            .then(result => res.status(200).send(result))
            .catch(err => {
                console.log(err);
                res.status(500).send(err.message);
            });
    })
})

module.exports = router;
