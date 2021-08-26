const router = require("express").Router();
const Fines = require("../Models/FineModel");
const driver = require("../Models/DriverModel");

router.post("/", (req, res) => {
  const {
    driverID,
    violationtype,
    Officers,
    comments,
    courtDate,
    fineType,
    vehicelNo,
    offenceDate,
    place,
    CourtPlace,
  } = req.body;

  let violationType = [];
  violationtype.forEach((element) => {
    violationType.push(element.value);
  });

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
    CourtPlace : CourtPlace.value,
    isPayed: false,
  });
  console.log("VV : ", violationType);
  fineDetails
    .save()
    .then((result) => {
      console.log("Successfully added to the fine db");
      driver
        .findByIdAndUpdate(driverID, {
          $push: {
            fines: result._id,
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
      console.log("error in adding", err);
      res.status(501).send(err);
    });
});

//IT18014396 - retrieve ongoing tickets
router.get("/ongoin/:id", (req, res) => {
  Fines.find({ driverID: req.params.id }, { isPayed: false })
    .populate("violationType")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//IT18014396 - retrieve tickets details
router.get("/:id", (req, res) => {
  Fines.findById({ _id: req.params.id })
    .populate("violationType", "ruleName description fineAmount")
    .populate("Officers", "nameInitial officerReg")
    .then((result) => {
      console.log(result);
      res.status(200).send([result]);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
