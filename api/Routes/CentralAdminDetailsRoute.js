const router = require("express").Router();
const  CentralAdmin= require("../Models/CentralAdminModel");

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

module.exports = router;
