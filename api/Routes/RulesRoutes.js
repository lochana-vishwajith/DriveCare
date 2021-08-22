const router = require("express").Router();
const Rules = require("../Models/RulesModel");
const RulesCategory = require("../Models/RulesCategoryModel");

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

router.post("/fullrule",async (req, res) => {
    if (req.body) {
        const ruleCategory = req.body.RuleCategoryId
        console.log(ruleCategory);
        const rules = new Rules(req.body);
        await rules
            .save()
            .then((data) => {
                res.status(200).send({ data: data });
                console.log(data);
                 RulesCategory.findByIdAndUpdate(ruleCategory, {
                    $push: {
                        Rules: data._id,
                    },
                }).then(
                    console.log(RulesCategory.findById(ruleCategory))
                 )
                    .then((data) => {
                        console.log("Successfully added the Research Details...", data);
                    })
                    .catch((err) => {
                        console.log({ error: err.message });
                    });
            })
            .catch((error) => {
                res.status(500).send({
                    error: error.message,
                });
            });
    }
});







module.exports = router;
