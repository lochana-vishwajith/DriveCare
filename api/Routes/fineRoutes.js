const router = require("express").Router();
const Fines = require("../Models/FineModel");
const driver = require("../Models/DriverModel");

router.post("/", (req, res) => {
  const {
    driverID,
    violationType,
    Officers,
    comments,
    courtDate,
    fineType,
    vehicelNo,
    offenceDate,
    place,
    CourtPlace,
  } = req.body;

  const fineDetails = new Fines({
    driverID,
    violationType,
    Officers,
    comments,
    courtDate,
    fineType,
    vehicelNo,
    offenceDate,
    place,
    CourtPlace,
    isPayed: false,
  });

  fineDetails
    .save()
    .then((result) => {
      console.log("Successfully added to the fine db");
      driver
        .findByIdAndUpdate(result, {
          $push: {
            Fines: result._id,
          },
        })
        .then((data) => {
          console.log("Successfully added to the driver db");
          res.status(200).send({ result, data });
        })
        .catch((err) => {
          console.log("error in adding to the driver db");
          res.status(501).send(err);
        });
    })
    .catch((err) => {
      console.log("error in adding");
      res.status(501).send(err);
    });
});

module.exports = router;
