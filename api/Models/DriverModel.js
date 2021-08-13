const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  licenceNumber: {
    type: String,
    required: true,
  },
  licenceExpiryDate: {
    type: Date,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicURL: {
    type: String,
    required: true,
  },
});

const driverDetails = mongoose.model("Driver", driverSchema);

module.exports = driverDetails;
