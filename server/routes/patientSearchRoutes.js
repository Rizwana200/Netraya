const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    searchPatientByPhone
} = require("../controllers/patientSearchController");


// ==========================================
// SEARCH PATIENT BY PHONE
// ==========================================

router.get(

    "/phone/:phone",

    authenticate,

    authorize(
        "STAFF",
        "DOCTOR",
        "ADMIN"
    ),

    searchPatientByPhone

);


module.exports = router;