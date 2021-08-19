const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminDetails = new Schema({
    name: {
        type: String,
        required: true,
    },
    nicNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    workstation: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    officeAddress: {
        type: String,
        required: true,
    },
    officeNumber: {
        type: String,
        required: true,
    },officerRegistrationNumber: {
        type: String,
        required: true,
    },


});
const AdminDetailsModel = mongoose.model(
    "adminDetails",
    AdminDetails
);
module.exports = AdminDetailsModel ;
