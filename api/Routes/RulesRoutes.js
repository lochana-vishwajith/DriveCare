const router = require("express").Router();
const Rules = require("../Models/RulesModel");
const RulesCategory = require("../Models/RulesCategoryModel");
//this is the rules api
//every rule has a category

//this is the post method which is used for posting categories only if it has all the fields
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

//this api route is for get all the categories
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

//this api post is to set a category rule eventhough all the details isnt with the catgory
router.post("/fullrule", async (req, res) => {
  if (req.body) {
    console.log("awaaa");
    const ruleCategory = req.body.RuleCategoryId;
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
        })
          .then(console.log(RulesCategory.findById(ruleCategory)))
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

//this api route is for get the rules using the related id
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  await Rules.find({ _id: id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//this is the api for get rules inside a category

router.get("/getrulesincat/:id", async (req, res) => {
  const id = req.params.id;

  await Rules.find({ RuleCategoryId: id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const dataSet = req.body;
  console.log("Data", dataSet);
  await Rules.findByIdAndUpdate(id, dataSet)
    .then((data) => {
      console.log(data);
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.send(error);
    });
});


router.delete("/delete/:id", async (req, res) => {

 console.log('delete rule called');
  let id = req.params.id;

  await Rules.findByIdAndDelete(id)
      .then((result) => {
        console.log("data is deleted");
        res.status(200).send({ status: result });
      })
      .catch((err) => {
        res.status(501).send(err);
      });
});


module.exports = router;
