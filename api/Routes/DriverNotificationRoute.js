const router = require("express").Router();
const Notification = require("../Models/DriverNotificationsModel");

router.get("/:id", (req, res) => {
  const id = req.params.id;

  Notification.find({ driverID: id, isViewed: false })
    .then((result) => {
      console.log(result);
      res.status(200).send([result]);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  // const dataSet = req.body;
  // console.log("Data", dataSet);
  await Notification.findByIdAndUpdate(id, { $set: { isViewed: true } })
    .then((data) => {
      console.log(data);
      res.status(200).send({ data: data });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
