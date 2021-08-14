const router = require("express").Router();
const TrafficOfficer = require("../Models/TrafficOfficerModel");

router.post("/", (req, res) => {
  const {
    firstName,
    lastName,
    nameInitial,
    dob,
    mobile,
    home,
    nic,
    officerReg,
    profilePicUrl,
  } = req.body;

  const trafficOfficerDetails = new TrafficOfficer({
    firstName,
    lastName,
    nameInitial,
    dob,
    mobile,
    home,
    nic,
    officerReg,
    profilePicUrl,
  });
  trafficOfficerDetails
    .save()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/", (req, res) => {
  TrafficOfficer.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(501).send(err);
    });
});

module.exports = router;
