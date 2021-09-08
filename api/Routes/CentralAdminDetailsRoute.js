const router = require("express").Router();
const  CentralAdmin= require("../Models/CentralAdminModel");

// post method which need to have all the details to post the data to the dab
router.post("/", (req, res) => {
    const { name,nicNumber,email,workstation,mobileNumber,officeAddress,officeNumber,officerRegistrationNumber} =
        req.body;

    const centralAdmin = new CentralAdmin({
        name,
        nicNumber,
        email,
        workstation,
        mobileNumber,
        officeAddress,
        officeNumber,
        officerRegistrationNumber
    });

    centralAdmin
        .save()
        .then((result) => {
            res.status(200).send({ result });
        })
        .catch((error) => {
            res.send(error);
        });
});

//get all the admin related details api
router.get("/getcentraladmin", async (req, res) => {
    try {
        const admin = await CentralAdmin.find();
        res.send(admin);
    } catch (error) {
        res.send(`Error - ${error}`);
    }
});

//update admin details method api
router.put("/updateadmin/:id", async (req, res) => {
    const id = req.params.id;
    const dataSet = req.body;
    console.log("Data", dataSet);
    await CentralAdmin.findByIdAndUpdate(id, dataSet)
        .then((data) => {
            console.log(data);
            res.status(200).send({ data: data });
        })
        .catch((error) => {
            res.send(error);
        });
});

module.exports = router;
