const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courtShema = new Schema({
  driverID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Driver",
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

const courtDetails = mongoose.model("Court", courtShema);

module.exports = courtDetails;
