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
  licenceStatus: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  fines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Fines",
    },
  ],
  competentDrive: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "vehicelcategory",
    },
  ],
  licenseIssueDate: {
    type: Date,
    required: false,
  },
});

const driverDetails = mongoose.model("Driver", driverSchema);

module.exports = driverDetails;
