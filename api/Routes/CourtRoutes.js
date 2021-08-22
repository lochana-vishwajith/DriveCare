const router = require("express").Router();
const Court = require("../Models/CourtModel");
const driver = require("../Models/DriverModel");

//get comments
router.get("/getc", async (req, res) => {
  try {
    const comments = await Court.find();
    res.send(comments);
  } catch (error) {
    res.send(`Error - ${error}`);
  }
});

//get a comment
router.get("/getc/:id", async (req, res) => {
  try {
    const comments = await Court.findById(req.params.id);
    res.send(comments);
  } catch (error) {
    res.send(`Error - ${error}`);
  }
});

//put a comment

router.post("/postc", async (req, res) => {
  const { driverID, date, comment } = req.body;
  const commentz = new Court({
    driverID,
    date,
    comment,
  });

  commentz
    .save()
    .then((result) => {
      console.log(`REsult eka - ${result}`);

      driver
        .findByIdAndUpdate(driverID, {
          $push: {
            courtComments: result._id,
          },
        })
        .then((response) => {
          res.send("Successfully added");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((error) => {
      console.log(`Error - ${error}`);
    });
});

// router.post("/postc", async (req, res) => {
//   const comment = new Court({
//     date: req.body.date,
//     comment: req.body.comment,
//   });

// try {
//   const c1 = await comment.save();
//   res.send(c1);
// } catch (error) {
//   res.send(error);
// }
// });

//update a comment
router.put("/putc/:id", async (req, res) => {
  const c = await Court.findById(req.params.id);

  try {
    c.comment = req.body.comment ? req.body.comment : c.comment;
    const c1 = c.save(c);
    res.send("Update Sucessfully");
  } catch (error) {
    res.send(error);
  }
});

router.delete("/deletec/:id", async (req, res) => {
  try {
    const c = await Court.findById(req.params.id);
    const c1 = await c.remove();
    res.send("Comment deleted !");
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
