const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverNotificationsSchema = new Schema({
  driverID: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  isViewed: {
    type: Boolean,
    required: true,
  },
});

const notificationDetails = mongoose.model(
  "notifications",
  driverNotificationsSchema
);

module.exports = notificationDetails;
