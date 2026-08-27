const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    getPatientDashboard
} = require("../controllers/patientDashboardController");


// Patient dashboard
router.get(
    "/",
    authenticate,
    authorize("PATIENT"),
    getPatientDashboard
);


module.exports = router;