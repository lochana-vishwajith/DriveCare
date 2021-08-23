const router = require("express").Router();
const CourtPolice = require("../Models/CourtPoliceModel");
const Judge = require("../Models/JudgeModel");
const Police = require("../Models/TrafficOfficerModel");

//put a comment
router.post("/postc", async (req, res) => {
  const { officerID, judgeID, date, comment } = req.body;
  const commentz = new CourtPolice({
    officerID,
    judgeID,
    date,
    comment,
  });

  const c = await commentz.save();
  res.send(c);

  const dr = await Police.findByIdAndUpdate(c.officerID, {
    $push: {
      courtComments: c._id,
    },
  });
  console.log(dr);

  const jd = await Judge.findByIdAndUpdate(c.judgeID, {
    $push: {
      officerComments: c._id,
    },
  });

  console.log(jd);

  // commentz
  //   .save()
  //   .then((result) => {
  //     console.log(`Result eka - ${result}`);

  //     Police.findByIdAndUpdate(officerID, {
  //       $push: {
  //         courtComments: result._id,
  //       },
  //     })

  // Judge.findByIdAndUpdate(judgeID, {
  //   $push: {
  //     officerComments: result._id,
  //   },
  // })

  //     .then((response) => {
  //       res.send(`Response - ${response}`);
  //       Judge.findByIdAndUpdate(judgeID, {
  //         $push: {
  //           officerComments: result._id,
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // })
  // .catch((error) => {
  //   console.log(`Errorr - ${error}`);
  // });

  // const comment = new CourtPolice({
  //   date: req.body.date,
  //   comment: req.body.comment,
  // });
  // try {
  //   const c1 = await comment.save();
  //   res.send(c1);
  // } catch (error) {
  //   res.send(error);
  // }
});

//get comments
router.get("/getc", async (req, res) => {
  try {
    const comments = await CourtPolice.find();
    res.send(comments);
  } catch (error) {
    res.send(`Error - ${error}`);
  }
});

//get a comment
router.get("/getc/:id", async (req, res) => {
  try {
    const comments = await CourtPolice.findById(req.params.id);
    res.send(comments);
  } catch (error) {
    res.send(`Error - ${error}`);
  }
});

module.exports = router;
