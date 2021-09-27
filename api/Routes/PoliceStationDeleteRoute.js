const router = require("express").Router();
const PoliceDelete= require("../Models/PoliceStationDelete");



router.post("/deletereq",async (req, res) => {
    if (req.body) {
        console.log('deletereq');
        const station = new PoliceDelete(req.body);
        await station
            .save()
            .then((data) => {
                res.status(200).send({data: data});
                console.log(data);

            })
            .catch((error) => {
                res.status(500).send({
                    error: error.message,
                });
            });
    }
});


router.get("/", (req, res) => {
    PoliceDelete.find()
        .then((result) => {
            console.log("Data are fetched");
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log("data not fetched", err);
            res.status(501).send(err);
        });
});

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    await PoliceDelete.find({ PidD: id })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.send(error);
        });
});

router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const dataSet = req.body;
    console.log("Data", dataSet);
    await PoliceDelete.findByIdAndUpdate(id, dataSet)
        .then((data) => {
            console.log(data);
            res.status(200).send({ data: data });
        })
        .catch((error) => {
            res.send(error);
        });
});


module.exports = router;

