const router = require("express").Router();
const Evidence = require("../Models/DriverEvidenceModel");
const Fine = require("../Models/FineModel");

router.post("/:id", async (req, res) => {
  const fineID = req.params.id;
  const evidence = new Evidence({
    evidenceURLs: req.body.evidenceURLs,
    evidenceDate: new Date(),
  });
  console.log("DATA: ", evidence);
  await evidence
    .save()
    .then((result) => {
      res.status(200).send({ result });
      Fine.findByIdAndUpdate(fineID, {
        $push: {
          evidence: result._id,
        },
      })
        .then((data) => {
          console.log("Evidence Added Successfully ", data);
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
  if (req.params && req.params.id) {
    await Fine.findById(req.params.id)
      .populate("evidence", "evidenceURLs")
      .then((result) => {
        res.status(200).send([result]);
      })
      .catch((err) => {
        res.status(501).status(err);
      });
  }
});
module.exports = router;
