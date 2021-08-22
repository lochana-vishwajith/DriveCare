const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const judgeShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  court: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  driverComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Court",
    },
  ],

  officerComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "CourtPolice",
    },
  ],
});

const judgeDetails = mongoose.model("judge", judgeShema);

module.exports = judgeDetails;
