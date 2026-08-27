const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const uploadProfilePhoto =
    require("../middleware/uploadProfilePhoto");

const {
    getMyPatientProfile,
    uploadMyProfilePhoto
} = require("../controllers/patientProfileController");


// ==========================================
// GET MY PATIENT PROFILE
// ==========================================

router.get(
    "/me",
    authenticate,
    authorize("PATIENT"),
    getMyPatientProfile
);


// ==========================================
// UPLOAD MY PROFILE PHOTO
// ==========================================

router.post(
    "/me/photo",
    authenticate,
    authorize("PATIENT"),
    uploadProfilePhoto.single("profilePhoto"),
    uploadMyProfilePhoto
);


module.exports = router;