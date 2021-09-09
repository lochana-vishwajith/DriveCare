const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

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
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  isNewUser: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  courtComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "CourtPolice",
    },
  ],
  policeStation: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "PoliceStation",
  },
});

trafficOfficerSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "aaaabbbbccccddddeeeeffffggggtttt");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};
const officerDetails = mongoose.model(
  "TrafficPoliceOfficer",
  trafficOfficerSchema
);
module.exports = officerDetails;
