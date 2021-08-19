const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverCommentsSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  commentDate: {
    type: Date,
    required: true,
  },
});

const driverComments = mongoose.model("DriverComments", driverCommentsSchema);

module.exports = driverComments;
