const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverEvidenceSchema = new Schema({
  evidenceURLs: [
    {
      type: String,
      required: true,
    },
  ],
  evidenceDate: {
    type: Date,
    required: true,
  },
});

const driverEvidence = mongoose.model("DriverEvidence", driverEvidenceSchema);

module.exports = driverEvidence;
