const router = require("express").Router();
const Driver = require("../Models/DriverModel");

router.post("/", (req, res) => {
    console.log("inside post");
  const { firstName, lastName, displayName, email, licenceNumber, password } =
    req.body;

  const driverDetails = new Driver({
    firstName,
    lastName,
    displayName,
    email,
    licenceNumber,
    password,
  });

  console.log("Data tika",driverDetails);

  driverDetails
    .save()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;