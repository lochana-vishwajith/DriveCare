const router = require("express").Router();
const Rules = require("../Models/RulesModel");

router.post("/", (req, res) => {
    const { ruleNo, ruleName, description,gazetteNo,date,demeritPoints,fineAmount,RuleCategoryId} =
        req.body;

    const RuleDetails = new Rules({
        ruleNo,
        ruleName,
        description,
        gazetteNo,
        date,
        demeritPoints,
        fineAmount,
        RuleCategoryId
    });

    RuleDetails
        .save()
        .then((result) => {
            res.status(200).send({ result });
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;
