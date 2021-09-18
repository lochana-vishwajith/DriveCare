const router = require("express").Router();
const Driver = require("../Models/DriverModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Rules = require("./RulesRoutes");

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

  bcrypt.hash(password, 10).then((hash) => {
    const driverDetails = new Driver({
      firstName,
      lastName,
      displayName,
      email,
      licenceNumber,
      password: hash,
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
});

router.post("/login", async (req, res) => {
  const { licenceNumber, password } = req.body;

  const login = await Driver.findOne({ licenceNumber: licenceNumber });

  const isMatch = await bcrypt.compare(password, login.password);

  const token = await login.generateAuthToken();

  res.cookie("JWTToken", token, {
    expires: new Date(Date.now() + 25892000000),
    httpOnly: true,
  });

  if (!isMatch) {
    console.log("Password is Incorrect");
    // res.json({ error: "Login Failed" });
    res.status(400).send();
  } else if (!login) {
    console.log("ID is Incorrect");
    // res.json({ error: "Login Failed" });
    res.status(401).send();
  } else {
    console.log("Login Successful");
    res.json({ message: "Login Successful", id: login._id });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  await Driver.find({ _id: id })
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
  await Driver.findByIdAndUpdate(id, dataSet)
    .then((data) => {
      console.log(data);
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/driverdetails/:id", async (req, res) => {
  const id = req.params.id;

  await Driver.find({ licenceNumber: id })
    .populate({
      path: "fines",
      populate: {
        path: "violationType",
        model: "rules",
      },
    })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

//IT19152806
router.put("/updatedpoints/:id", async (req, res) => {
  const c = await Driver.findById(req.params.id);

  try {
    c.points = req.body.points;
    const c1 = c.save(c);
    res.send(c1);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
