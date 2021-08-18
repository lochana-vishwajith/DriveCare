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

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Driver.find({ licenceNumber: id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const dataSet = {
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    displayName:req.body.displayName,
    email:req.body.email,
    licenceNumber:req.body.licenceNumber,
    password:req.body.password,
    address:req.body.address,
    licenceExpiryDate:req.body.licenceExpiryDate,
    NIC:req.body.NIC,
    mobile:req.body.mobile,
    dob:req.body.dob,
    profilePicURL:req.body.profilePicURL,
  };
  console.log("Data", dataSet);
  Driver.findByIdAndUpdate({ _id: id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
