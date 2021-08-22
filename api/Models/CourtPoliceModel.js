const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courtShema = new Schema({
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
