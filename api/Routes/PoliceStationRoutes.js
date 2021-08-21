const router = require("express").Router();
const PoliceStation = require("../Models/PoliceStationModel");

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

router.get("/getAllPoliceStations", async (req, res) => {
    try {
        const stations = await PoliceStation.find();
        res.send(stations);
    } catch (error) {
        res.send(`Error - ${error}`);
    }
});

module.exports = router;
