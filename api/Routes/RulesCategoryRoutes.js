const router = require("express").Router();
const RulesCategory = require("../Models/RulesCategoryModel");

router.post("/", (req, res) => {
    const { categoryName,categoryNumber,range,severity,description} =
        req.body;

    const RulesCategory = new RulesCategory({
        categoryName,
        categoryNumber,
        range,
        severity,
        description
    });

    RulesCategory
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

    await RulesCategory.find({ licenceNumber: id })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((error) => {
            res.send(error);
        });
});

router.get("/getcatrules/:id", async (req, res) => {
    if (req.params && req.params.id) {
        await RulesCategory.findById(req.params.id)
            .populate('rules', 'ruleNo ruleName demeritPoints')
            .then(data => {
                res.status(200).send(data);
                console.log(data);
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
})

router.get("/", async(req, res) => {
    console.log("awaaa");
   await RulesCategory.find()
        .then((result) => {
            console.log("Data are fetched");
            res.status(200).send(result);
        })
        .catch((err) => {
            console.log("data not fetched", err);
            res.status(501).send(err);
        });
});



module.exports = router;
