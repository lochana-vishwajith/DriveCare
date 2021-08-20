const router = require("express").Router();
const Fines = require("../Models/FineModel");

router.post("/", (req, res) => {
  const { driverID, violationType, Officers, comments, courtDate, fineType } =
    req.body;

  const fineDetails = new Fines({
    driverID,
    violationType,
    Officers,
    comments,
    courtDate,
    fineType,
  });

  fineDetails
    .save()
    .then((result) => {
      console.log("Successfully added");
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log("error in adding");
      res.status(501).send(err);
    });
});

module.exports = router;
