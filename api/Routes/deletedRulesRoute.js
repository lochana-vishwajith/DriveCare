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
router.get("/:deletedid", async (req, res) => {
    const id = req.params.id;

    await Rules.find({ _id: id })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;