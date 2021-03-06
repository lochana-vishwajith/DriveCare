const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const policeStationsDelete = new Schema({
    registrationNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },

    mobile_Number: {
        type: String,
        required: true,
    },
    station_grade: {
        type: String,
        enum:["A","B","C"],
        required: true,
    },
    comment:{
        type: String,
        required: true,
    },
    PidD:{
        type: String,
        required: true,
    },
    Status:{
      type:String  ,
        default:'Pending',
    },
    DateInquired:{
        type:Date,
        default:Date.now
    },
    AdminComment:{
        type:String,
        default:"No comments yet"
    }
});



const police_StationDelete = mongoose.model(
    "PoliceStationDelete",
    policeStationsDelete
);
module.exports = police_StationDelete;
