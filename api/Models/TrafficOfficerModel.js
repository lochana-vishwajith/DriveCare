const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trafficOfficerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  nameInitial: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  home: {
    type: String,
  },
  nic: {
    type: String,
    required: true,
  },
  officerReg: {
    type: String,
    required: true,
  },
  profilePicUrl: {
    type: String,
    required: true,
  },
});
const officerDetails = mongoose.model(
  "TrafficPoliceOfficer",
  trafficOfficerSchema
);
module.exports = officerDetails;
