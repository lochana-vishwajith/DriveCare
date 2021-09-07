const router = require("express").Router();
const RulesCategory = require("../Models/RulesCategoryModel");
//this api route is used to categorized the routes
//every rule has a category and one rule be in a one category

//post route for the rule category
router.post("/", (req, res) => {
    const { categoryName,categoryNumber,range,severity,description} =
        req.body;

    const RulesCategories = new RulesCategory({
        categoryName,
        categoryNumber,
        range,
        severity,
        description
    });

    RulesCategories
        .save()
        .then((result) => {
            res.status(200).send({ result });
        })
        .catch((error) => {
            res.send(error);
        });
});


//get by id route for the rulecategory
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


//this route is for get all the rules inside a category
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

//get all the categories api route
router.get("/", async(req, res) => {
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
