const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courtShema = new Schema({
  officerID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "TrafficPoliceOfficer",
  },
  judgeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "judge",
  },
  date: {
    type: Date,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const courtDetails = mongoose.model("CourtPolice", courtShema);

module.exports = courtDetails;
