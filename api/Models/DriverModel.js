const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

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

  courtComments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Court",
    },
  ],
  bloodGroup: {
    type: String,
    required: false,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

driverSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, "dr1v#c@re$#cr#t");
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const driverDetails = mongoose.model("Driver", driverSchema);

module.exports = driverDetails;
