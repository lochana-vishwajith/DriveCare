const router = require("express").Router();
const Fines = require("../Models/FineModel");
const driver = require("../Models/DriverModel");
const Rules = require("../Models/RulesModel");
const Notification = require("../Models/DriverNotificationsModel");
const moment = require("moment");

router.post("/", async (req, res) => {
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
    totalFine,
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
    CourtPlace: CourtPlace.value,
    isPayed: false,
    totalFine,
  });

  const notificationDetails = new Notification({
    driverID,
    description: `You Got a New Fine ${fineType}`,
    createdDate: offenceDate,
    isViewed: false,
  });
  console.log("VV : ", violationType);
  await fineDetails
    .save()
    .then((result) => {
      console.log("Successfully added to the fine db");
      driver
        .findByIdAndUpdate(driverID, {
          $push: {
            fines: result._id,
          },
        })
        .then(async (data) => {
          console.log("Successfully added to the driver db");
          let rules = [];
          rules = await Rules.find();
          let selectedRules = [];
          violationType.forEach((rule) => {
            rules.forEach((sele) => {
              if (rule == sele._id) {
                selectedRules.push(sele.demeritPoints);
              }
            });
          });
          let total = 0;
          selectedRules.forEach((point) => {
            console.log("points = ", point);
            total = parseInt(total) + parseInt(point);
            console.log("total in : ", total);
          });
          console.log("point : ", total);
          const driverD = await driver.findById(driverID);
          let remaining = 0;
          remaining = parseInt(driverD.points) - parseInt(total);
          if (parseInt(remaining) < 0) {
            remaining = 0;
          }
          driver
            .update(
              { _id: driverID },
              {
                $set: {
                  points: remaining,
                  licenceStatus: "Pending",
                },
              }
            )
            .then((resultTwo) => {
              console.log("ponits are reduced");
              res.status(200).send({ result, data, resultTwo });
            })
            .catch((err) => {
              console.log("error in adding to the driver db", err);
              res.status(501).send(err);
            });
        })
        .catch((err) => {
          console.log("error in adding to the driver db", err);
          res.status(501).send(err);
        });
      notificationDetails
        .save()
        .then((response) => {
          console.log("Successfully added to the Notification");
          // res.status(200).send({ result, response });
        })
        .catch((error) => {
          console.log("error in adding to the Nofication");
          res.status(501).send(error);
        });
    })
    .catch((err) => {
      console.log("error in adding", err);
      res.status(501).send(err);
    });
});

//IT18014396 - retrieve ongoing tickets
router.get("/ongoin/:id", (req, res) => {
  Fines.find({ driverID: req.params.id, isPayed: false })
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

//IT19152806
router.get("/", async (req, res) => {
  try {
    const fines = await Fines.find()
      .populate("violationType", "ruleName description fineAmount")
      .populate("comments", "comment")
      .populate("Officers", "nameInitial officerReg");
    res.send(fines);
  } catch (error) {
    console.log(error);
  }
});

router.get("/officer/:id", async (req, res) => {
  try {
    const fines = await Fines.find({ Officers: req.params.id })
      .populate("violationType", "ruleName description fineAmount")
      .populate(
        "driverID",
        "firstName lastName licenceNumber profilePicURL licenceStatus points"
      )
      .populate("comments", "comment")
      .populate("Officers", "nameInitial officerReg");
    res.send(fines);
  } catch (error) {
    console.log(error);
  }
});

//IT18014396 - retrieve all tickets
router.get("/summary/:id", (req, res) => {
  Fines.find({ driverID: req.params.id })
    .populate("violationType")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//IT18014396 - retrieve all tickets for licence number
router.get("/thirdpartyDetails/:id", (req, res) => {
  console.log("ID :", req.params.id);
  Fines.find({ licenceNumber: req.params.id })
    .populate("violationType")
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put("/uploadImage/:id", async (req, res) => {
  const { driverID, UploadedImageUrl } = req.body;

  console.log("id : ", driverID);
  console.log("url : ", UploadedImageUrl);
  let id = req.params.id;
  await Fines.update(
    { _id: id },
    {
      $set: {
        confirmImage: UploadedImageUrl,
        isPayed: true,
      },
    }
  )
    .then(async (result) => {
      console.log("Images Added : ", result);
      await driver
        .update(
          { _id: driverID },
          {
            $set: {
              licenceStatus: "Active",
            },
          }
        )
        .then((resultTwo) => {
          console.log("Status changed");
          res.status(200).send({ result, resultTwo });
        });
    })
    .catch((err) => {
      console.log("Images not added : ", err);
      res.status(500).send(err);
    });
});

module.exports = router;
