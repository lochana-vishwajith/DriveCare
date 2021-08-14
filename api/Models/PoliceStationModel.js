const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const policeStations = new Schema({
    registrationNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    workstation_Address: {
        type: String,
        required: true,
    },
    mobile_Number: {
        type: String,
        required: true,
    },
    office_Number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    station_grade: {
        type: String,
        enum:["A","B","C"],
        required: true,
    },
    officers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            require: false,
            ref: "TrafficPoliceOfficers",

        }]
});
const police_Station = mongoose.model(
    "PoliceStation",
    policeStations
);
module.exports = police_Station;
