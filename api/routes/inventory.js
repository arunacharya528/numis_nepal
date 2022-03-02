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
        searchClause = [...searchClause, ...[{ 'status': req.query.status }]];
    }
    if (req.query.type) {
        searchClause = [...searchClause, ...[{ 'type': req.query.type }]];
    }
    if (req.query.client_id) {
        searchClause = [...searchClause, ...[{ 'client': new ObjectId(req.query.client_id) }]];
    }
    if (req.query.collectible_id) {
        searchClause = [...searchClause, ...[{ 'collectible': new ObjectId(req.query.collectible_id) }]];
    }


    var dateClause = {};
    if (req.query.from) {
        dateClause['$gte'] = new Date(req.query.from);
    }
    if (req.query.to) {
        dateClause['$lte'] = new Date(req.query.to);
    }
    if (dateClause['$gte'] || dateClause['$lte']) {
        searchClause = [...searchClause, ...[{ 'date': dateClause }]]
    }

    if (searchClause.length == 0) {
        searchClause = [{}];
    }
    // console.log(searchClause);
    var query = [
        {
            '$match': {
                "$and": searchClause
            }
        },
        {
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
            "$sort": { "date": -1 }
        }];
    console.log(searchClause, query)
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

router.get("/inventory/remainingQuantity/:collectible_id", (req, res, next) => {
    Inventory
        .aggregate([
            {
                '$group': {
                    '_id': '$collectible',
                    'bought': {
                        '$sum': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$type', 'bought'
                                    ]
                                }, '$quantity', 0
                            ]
                        }
                    },
                    'sold': {
                        '$sum': {
                            '$cond': [
                                {
                                    '$eq': [
                                        '$type', 'sold'
                                    ]
                                }, '$quantity', 0
                            ]
                        }
                    }
                }
            }, {
                '$match': {
                    '_id': new ObjectId(req.params.collectible_id)
                }
            }, {
                '$project': {
                    '_id': '$_id',
                    'remainingQuantity': {
                        '$subtract': [
                            '$bought', '$sold'
                        ]
                    }
                }
            }
        ])
        .then(result => {
            res.status(200).send(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err.message);
        });
})

router.put("/inventory/:inventory_id", (req, res, next) => {
    const { status } = req.body;

    Inventory.findById(req.params.inventory_id, (err, data) => {
        data.status = status;
        data.save()
            .then(result => res.status(200).send(result))
            .catch(err => {
                console.log(err);
                res.status(500).send(err.message);
            });
    })
})


module.exports = router;