const router = require("express").Router();
const Driver = require("../Models/DriverModel");

router.post("/", (req, res) => {
  console.log("inside post");
  const {
    firstName,
    lastName,
    displayName,
    email,
    licenceNumber,
    password,
    address,
    licenceExpiryDate,
    NIC,
    mobile,
    dob,
    profilePicURL,
  } = req.body;

  const driverDetails = new Driver({
    firstName,
    lastName,
    displayName,
    email,
    licenceNumber,
    password,
    address,
    licenceExpiryDate,
    NIC,
    mobile,
    dob,
    profilePicURL,
    licenceStatus: "Active",
    points: 30,
  });

  console.log("Data tika", driverDetails);

  driverDetails
    .save()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  await Driver.find({ licenceNumber: id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/", (req, res) => {
  Driver.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(501).status(err);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const dataSet = req.body;
  console.log("Data", dataSet);
  await Driver.findByIdAndUpdate(id,dataSet)
    .then((data) => {
      console.log(data)
      res.status(200).send({data:data},);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
