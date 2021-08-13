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
      res.json("data is added", result);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
