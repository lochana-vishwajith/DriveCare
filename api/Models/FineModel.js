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
    required: true,
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
      type: String,
      required: false,
    },
  ],
});

const finemodel = mongoose.model("Fines", fineSchema);
module.exports = finemodel;
