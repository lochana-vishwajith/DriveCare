const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
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

policeStations.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, "pol1v#c@re$#cr#t");
        //this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

const police_Station = mongoose.model(
    "PoliceStation",
    policeStations
);
module.exports = police_Station;
