const router = require("express").Router();
const Court = require("../Models/CourtModel");

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
  const comment = new Court({
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

module.exports = router;
