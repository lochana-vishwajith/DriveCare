const router = require("express").Router();
const Comment = require("../Models/DriverCommentsModel");
const Fine = require("../Models/FineModel");

router.post("/:id", async (req, res) => {
  const fineID = req.params.id;
  const comments = new Comment({
    comment: req.body.comment,
    commentDate: new Date(),
  });
  console.log("DATA: ", comments);
  await comments
    .save()
    .then((result) => {
      res.status(200).send({ result });
      Fine.findByIdAndUpdate(fineID, {
        $push: {
          comments: result._id,
        },
      })
        .then((data) => {
          console.log("Comment Added Successfully ", data);
        })
        .catch((error) => {
          console.log("Error", error);
        });
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

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Comment.findByIdAndDelete(id)
    .then((result) => {
      console.log("comment is deleted");
      res.status(200).send({ status: result });
    })
    .catch((err) => {
      res.status(501).send(err);
    });
});

router.get("/comments/:id", async (req, res) => {
  if (req.params && req.params.id) {
    await Fine.findById(req.params.id)
      .populate("comments", "comment commentDate")
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(501).status(err);
      });
  }
});

module.exports = router;
