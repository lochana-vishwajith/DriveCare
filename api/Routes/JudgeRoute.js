const router = require("express").Router();
// const Fines = require("../Models/FineModel");
// const driver = require("../Models/DriverModel");
const Judge = require("../Models/JudgeModel");

router.post("/post", (req, res) => {
  const { name, dob, court, username, password } = req.body;

  const judge = new Judge({
    name,
    dob,
    court,
    username,
    password,
  });

  judge
    .save()
    .then((result) => {
      console.log(`Result - ${result}`);
      res.status(200).send("Sucessfully entered");
    })
    .catch((err) => {
      console.log(err);
    });

  //   fineDetails
  //     .save()
  //     .then((result) => {
  //       console.log("Successfully added to the fine db");
  //       driver
  //         .findByIdAndUpdate(driverID, {
  //           $push: {
  //             fines: result._id,
  //           },
  //         })
  //         .then((data) => {
  //           console.log("Successfully added to the driver db");
  //           res.status(200).send({ result, data });
  //         })
  //         .catch((err) => {
  //           console.log("error in adding to the driver db");
  //           res.status(501).send(err);
  //         });
  //     })
  //     .catch((err) => {
  //       console.log("error in adding", err);
  //       res.status(501).send(err);
  //     });
});

module.exports = router;
