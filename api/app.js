const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 9000;

const url = process.env.MONGODB_URL;

mongoose.connect(url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const trafficOfficerDetails = require("./Routes/TrafficOfficerRoutes");
app.use("/trafficOfficer", trafficOfficerDetails);

const driverDetails = require("./Routes/DriverRoutes");
app.use("/driver", driverDetails);

const courtDetails = require("./Routes/CourtRoutes");
app.use("/court", courtDetails);

const courtPoliceDetails = require("./Routes/CourtPoliceRoutes");
app.use("/courtp", courtPoliceDetails);

const PoliceStationDetails = require("./Routes/PoliceStationRoutes");
app.use("/policeStation", PoliceStationDetails);

const Rules = require("./Routes/RulesRoutes");
app.use("/rules", Rules);

const RulesCategory = require("./Routes/RulesCategoryRoutes");
app.use("/rulesCategory", RulesCategory);

const adminDetails = require("./Routes/CentralAdminDetailsRoute");
app.use("/adminDetails", adminDetails);

const fineDetails = require("./Routes/fineRoutes");
app.use("/fine", fineDetails);

const driverComments = require("./Routes/DriverCommentsRoute");
app.use("/driverComments", driverComments);

const vehicelcategory = require("./Routes/vehicleCategoryRoutes");
app.use("/vehicelcategory", vehicelcategory);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to mongo DB");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
