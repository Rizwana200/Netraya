const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    registerPatient,
    searchPatientByPhone
} = require("../controllers/patientController");


// Patient registration
router.post(
    "/register",
    registerPatient
);


// Search patient
router.get(
    "/search/:phone",
    authenticate,
    authorize("STAFF", "DOCTOR", "ADMIN"),
    searchPatientByPhone
);


module.exports = router;