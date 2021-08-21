const router = require("express").Router();
const CourtPolice = require("../Models/CourtPoliceModel");

//put a comment
router.post("/postc", async (req, res) => {
  const comment = new CourtPolice({
    date: req.body.date,
    comment: req.body.comment,
  });

  try {
    const c1 = await comment.save();
    res.send(c1);
  } catch (error) {
    res.send(error);
  }
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
