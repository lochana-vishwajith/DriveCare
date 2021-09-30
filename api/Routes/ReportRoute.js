const PoliceStation = require("../Models/PoliceStationModel");
const Driver = require("../Models/DriverModel");
const TrafficOfficer = require("../Models/TrafficOfficerModel");
const Rules = require("../Models/RulesModel");
const router = require("express").Router();

router.get("/", async (req, res) => {
    try {
        console.log("report came")

        const stations = await PoliceStation.count();
        const drivers = await Driver.count();
        const officers =await TrafficOfficer.count();
        const rules = await Rules.count();

        const obj={
            stations,
            drivers,
            officers,
            rules
        }
        res.send(obj);
    } catch (error) {
        res.send(`Error - ${error}`);
    }
});

module.exports = router