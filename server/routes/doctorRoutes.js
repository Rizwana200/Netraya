const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    getDoctorDashboard,
    updateDoctorTokenStatus,
    getPatientProfile
} = require("../controllers/doctorController");


// ==========================================
// DOCTOR DASHBOARD
// ==========================================

// Get today's patient queue
router.get(
    "/today",
    authenticate,
    authorize("DOCTOR"),
    getDoctorDashboard
);


// Keep dashboard route available
router.get(
    "/dashboard",
    authenticate,
    authorize("DOCTOR"),
    getDoctorDashboard
);


// ==========================================
// PATIENT PROFILE
// ==========================================

// Doctor views a patient's profile
router.get(
    "/patient/:patientId",
    authenticate,
    authorize("DOCTOR"),
    getPatientProfile
);


// ==========================================
// UPDATE TOKEN STATUS
// ==========================================

router.put(
    "/token/:tokenId/status",
    authenticate,
    authorize("DOCTOR"),
    updateDoctorTokenStatus
);


module.exports = router;