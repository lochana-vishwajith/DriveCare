const router = require("express").Router();
const DeletedRules = require("../Models/DeletedRulesModel");
const RulesCategory = require("../Models/RulesCategoryModel");
const mongoose = require('mongoose');


router.get("/", (req, res) => {
    DeletedRules.find()
        .then((result) => {
            console.log("Data are fetched");
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log("data not fetched", err);
            res.status(501).send(err);
        });
});

module.exports = router;