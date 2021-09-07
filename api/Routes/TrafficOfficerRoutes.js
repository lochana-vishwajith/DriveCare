const router = require("express").Router();
const { response } = require("express");
const TrafficOfficer = require("../Models/TrafficOfficerModel");
const police = require("../Models/PoliceStationModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    policeStation,
  } = req.body;
  const password = nic;
  bcrypt.hash(password, 10).then((hash) => {
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
      password: hash,
      policeStation,
      points: 30,
      isNewUser: true,
      status: "Active",
    });
    trafficOfficerDetails
      .save()
      .then((result) => {
        res.status(200).send({ result });
        police
          .findByIdAndUpdate(policeStation, {
            $push: {
              officers: result._id,
            },
          })
          .then((data) => {
            console.log("Successfully added to the police station db");
            res.status(200).send({ result, data });
          })
          .catch((err) => {
            console.log("error in adding to the police station db");
            res.status(501).send(err);
          });
      })
      .catch((err) => {
        res.send(err);
      });
  });
});

router.post("/login", async (req, res) => {
  const { officerReg, password } = req.body;

  const login = await TrafficOfficer.findOne({ officerReg: officerReg });
  const isMatch = await bcrypt.compare(password, login.password);
  const token = await login.generateAuthToken();

  res.cookie("JWTToken", token, {
    expires: new Date(Date.now() + 25892000000),
    httpOnly: true,
  });

  if (!isMatch) {
    console.log("Password is incorrect");
  } else if (!login) {
    res.json({ error: "Login Failed" });
  } else {
    res.json({ message: "Login Successfull", id: login._id });
  }
});

router.get("/:id", async (req, res) => {
  let id = req.params.id;

  await TrafficOfficer.find({ policeStation: id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(501).send(err);
    });
});
router.get("/officerreg/:id", async (req, res) => {
  let id = req.params.id;
  await TrafficOfficer.findOne({ officerReg: id })
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

router.put("/updatePw/:id", (req, res) => {
  let id = req.params.id;
});

module.exports = router;
