const router = require("express").Router();
const DeletedRules = require("../Models/DeletedRulesModel");
const RulesCategory = require("../Models/RulesCategoryModel");
const mongoose = require('mongoose');
//this api route is to delte a rule from the main collection and put it into the deleted rule collection


//deleted rule get all api
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


//this post api route is used to post the deletedrules collection
router.post("/todelterule",async (req, res) => {
    if (req.body) {
        console.log('awaaa');
        const rules = new DeletedRules(req.body);
        await rules
            .save()
            .then((data) => {
                res.status(200).send({data: data});
                console.log(data);

            })
            .catch((error) => {
                res.status(500).send({
                    error: error.message,
                });
            });
    }
});

// get by id
//used to get the specific deleted rule
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    await DeletedRules.find({ _id: id })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;