const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fineSchema = new Schema({
  driverID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Driver",
  },
  fineType: {
    type: String,
    required: true,
  },
  courtDate: {
    type: Date,
    required: false,
  },
  offenceDate: {
    type: Date,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  vehicelNo: {
    type: String,
    required: true,
  },
  CourtPlace: {
    type: String,
    required: false,
  },
  isPayed: {
    type: Boolean,
    required: false,
  },

  confirmImage: {
    type: String,
    required: false,
  },
  violationType: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "rules",
    },
  ],
  Officers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "TrafficPoliceOfficer",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "DriverComments",
    },
  ],
  evidence: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "DriverEvidence",
    },
  ],
});

const finemodel = mongoose.model("Fines", fineSchema);
module.exports = finemodel;
