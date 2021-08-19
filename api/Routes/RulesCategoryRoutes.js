const router = require("express").Router();
const RulesCategory = require("../Models/RulesCategoryModel");

router.post("/", (req, res) => {
    const { categoryName,categoryNumber,range,severity,description} =
        req.body;

    const RulesCategory = new RulesCategory({
        categoryName,
        categoryNumber,
        range,
        severity,
        description
    });

    RulesCategory
        .save()
        .then((result) => {
            res.status(200).send({ result });
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;
