const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

const Collectible = mongoose.model("Collectible");
const Client = mongoose.model("Client");
const Inventory = mongoose.model("Inventory");

var ObjectID = require('mongodb').ObjectID;
const { ObjectId } = require('mongodb');
const { query } = require('express');

router.get("/inventory", (req, res, next) => {

    var searchClause = [];
    if (req.query.status) {
        searchClause = [{ 'status': req.query.status }]
    }
    if (req.query.type) {
        searchClause = [{ 'type': req.query.type }];
    }
    if (req.query.status && req.query.type) {
        searchClause = [{ 'status': req.query.status }, { 'type': req.query.type }];
    }
    if (!req.query.status && !req.query.type) {

        searchClause = [{}];
    }
    var query = [{
        '$lookup': {
            'from': 'clients',
            'localField': 'client',
            'foreignField': '_id',
            'as': 'client'
        }
    }, {
        '$lookup': {
            'from': 'collectibles',
            'localField': 'collectible',
            'foreignField': '_id',
            'as': 'collectible'
        }
    }, {
        '$match': {
            "$and": searchClause
        }
    }, {
        "$sort": { "date": -1 }
    }];


    Inventory
        .aggregate(query)
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })
})

router.post("/inventory", (req, res, next) => {

    var { buyingPrice, sellingPrice, quantity, status, collectibleId, clientId, type } = req.body;
    const collectible = new ObjectId(collectibleId);
    const client = new ObjectId(clientId);
    const date = new Date();

    const input = { collectible, buyingPrice, sellingPrice, quantity, status, client, type, date };

    Inventory
        .create(input)
        .then(result => res.status(200).send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        });
})

router.get("/inventory/:inventory_id", (req, res, next) => {
    Inventory
        .aggregate([{
            '$match': {
                '_id': new ObjectId(req.params.inventory_id)
            }
        }, {
            '$lookup': {
                'from': 'clients',
                'localField': 'client',
                'foreignField': '_id',
                'as': 'client'
            }
        }, {
            '$lookup': {
                'from': 'collectibles',
                'localField': 'collectible',
                'foreignField': '_id',
                'as': 'collectible'
            }
        }])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        })
})


module.exports = router;