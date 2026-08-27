const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    getDoctorDashboard,
    updateDoctorTokenStatus
} = require("../controllers/doctorController");


// ==========================================
// DOCTOR DASHBOARD
// ==========================================

// Existing frontend uses /doctor/today
router.get(
    "/today",
    authenticate,
    authorize("DOCTOR"),
    getDoctorDashboard
);


// Also keep /doctor/dashboard available
router.get(
    "/dashboard",
    authenticate,
    authorize("DOCTOR"),
    getDoctorDashboard
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