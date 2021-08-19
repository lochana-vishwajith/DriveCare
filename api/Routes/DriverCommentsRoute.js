const router = require("express").Router();
const Comment = require("../Models/DriverCommentsModel");

router.post("/", (req, res) => {
  const comments = new Comment({
    comment: req.body.comment,
    commentDate: new Date(),
  });
  console.log("DATA: ", comments);
  comments
    .save()
    .then((result) => {
      res.status(200).send({ result });
    })
    .catch((error) => {
      res.send(error);
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  await Comment.find({ _id: id })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((error) => {
      res.send(error);
    });
});

router.delete("/:id",async (req,res)=>{
    const id = req.params.id;

    await Comment.findByIdAndDelete(id)
    .then((result) => {
        console.log("comment is deleted");
        res.status(200).send({ status: result });
      })
      .catch((err) => {
        res.status(501).send(err);
      });
})

module.exports = router;
