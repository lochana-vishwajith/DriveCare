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
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  licenceNumber: {
    type: String,
    required: true,
  },
  licenceExpiryDate: {
    type: Date,
    required: false,
  },
  NIC: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicURL: {
    type: String,
    required: false,
  },
});

const driverDetails = mongoose.model("Driver", driverSchema);

module.exports = driverDetails;
