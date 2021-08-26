const router = require("express").Router();
const PoliceStation = require("../Models/PoliceStationModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
router.post("/", (req, res) => {
    const { registrationNo, email,workstation_Address,mobile_Number,office_Number,password,station_grade} =
        req.body;


    const PoliceStationDetails = new PoliceStation({
        registrationNo,
        email,
        workstation_Address,
        mobile_Number,
        office_Number,
        password,
        station_grade
    });

    PoliceStationDetails
        .save()
        .then((result) => {
            res.status(200).send({ result });
        })
        .catch((error) => {
            res.send(error);
        });
});

 router.post("/hashedpost", (req, res) => {
  console.log("inside post");

  const { registrationNo, email,workstation_Address,mobile_Number,office_Number,password,station_grade} =
        req.body;

    bcrypt.hash(password, 10).then((hash) => {
    const PoliceStationDetails = new PoliceStation({
      registrationNo,
        email,
        workstation_Address,
        mobile_Number,
        office_Number,
        password: hash,
      station_grade
    });

    console.log("Data tika", PoliceStationDetails);

    PoliceStationDetails
      .save()
      .then((result) => {
        res.status(200).send({ result });
        console.log(result)
      })
      .catch((error) => {
        res.send(error);
      });
  });
});



router.get("/getAllPoliceStations", async (req, res) => {
    try {
        const stations = await PoliceStation.find();
        res.send(stations);
    } catch (error) {
        res.send(`Error - ${error}`);
    }
});


router.get("/:id", async (req, res) => {
    const id = req.params.id;
console.log(id)

    await PoliceStation.find({ registrationNo: id })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.send(error);
        });
});

router.post("/login", async (req, res) => {
    const { registrationNo, password } = req.body;

    const login = await PoliceStation.findOne({ registrationNo: registrationNo });

    const isMatch = await bcrypt.compare(password, login.password);

    const token = await login.generateAuthToken();

    res.cookie("JWTToken", token, {
        expires: new Date(new Date() + 25892000000),
        httpOnly: true,
    });

    if (!isMatch) {
        console.log("Password is Incorrect");
        res.json({ error: "Login Failed" });
    } else if (!login) {
        console.log("ID is Incorrect");
        res.json({ error: "Login Failed" });
    } else {
        console.log("Login Successful");
        res.json({ message: "Login Successful", id: login._id });
    }
});


module.exports = router;
