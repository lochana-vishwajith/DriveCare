const router = require("express").Router();
const vehicelcategory = require("../Models/vehicleCategoryModel");

router.post("/", (req, res) => {
  const { categoryName, categoryCode, otherCategoriesCanBeDriven } = req.body;

  const category = new vehicelcategory({
    categoryName,
    categoryCode,
    otherCategoriesCanBeDriven,
  });

  category
    .save()
    .then((result) => {
      console.log("successfully saved in DB");
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(501).send(err);
    });
});

router.get("/", (req, res) => {
  vehicelcategory
    .find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(501).send(err);
    });
});

module.exports = router;
