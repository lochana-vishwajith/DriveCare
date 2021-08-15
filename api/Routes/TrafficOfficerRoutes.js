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

router.get("/", async (req, res) => {
  await TrafficOfficer.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(501).send(err);
    });
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;

  await TrafficOfficer.findByIdAndDelete(id)
    .then((result) => {
      console.log("data is deleted");
      res.status(200).send({ status: result });
    })
    .catch((err) => {
      res.status(501).send(err);
    });
});

module.exports = router;
