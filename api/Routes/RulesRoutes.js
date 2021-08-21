const router = require("express").Router();
const Rules = require("../Models/RulesModel");

router.post("/", (req, res) => {
  const {
    ruleNo,
    ruleName,
    description,
    gazetteNo,
    date,
    demeritPoints,
    fineAmount,
    RuleCategoryId,
  } = req.body;

  const RuleDetails = new Rules({
    ruleNo,
    ruleName,
    description,
    gazetteNo,
    date,
    demeritPoints,
    fineAmount,
    RuleCategoryId,
  });

  RuleDetails.save()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/", (req, res) => {
  Rules.find()
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
