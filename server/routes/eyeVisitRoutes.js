const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    createEyeVisit,
    getEyeHistory
} = require("../controllers/eyeVisitController");


// ==========================================
// DOCTOR CREATES EYE EXAMINATION
// ==========================================

router.post(
    "/patient/:patientId",
    authenticate,
    authorize("DOCTOR"),
    createEyeVisit
);


// ==========================================
// VIEW PATIENT EYE HISTORY
// ==========================================

router.get(
    "/patient/:patientId/history",
    authenticate,
    authorize(
        "PATIENT",
        "STAFF",
        "DOCTOR",
        "ADMIN"
    ),
    getEyeHistory
);


module.exports = router;