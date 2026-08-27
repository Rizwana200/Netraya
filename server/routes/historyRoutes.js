const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    getPatientHistory
} = require("../controllers/historyController");


// ==========================================
// COMPLETE PATIENT HISTORY
// ==========================================

router.get(

    "/patient/:patientId",

    authenticate,

    authorize(
        "STAFF",
        "DOCTOR",
        "PATIENT",
        "ADMIN"
    ),

    getPatientHistory

);


module.exports = router;