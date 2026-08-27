const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const uploadProfilePhoto =
    require("../middleware/uploadProfilePhoto");

const {
    getAllDoctors,
    getDoctorProfile,
    getMyDoctorProfile,
    updateMyDoctorProfile
} = require("../controllers/doctorProfileController");

const {
    uploadMyDoctorProfilePhoto
} = require("../controllers/doctorProfilePhotoController");


// ==========================================
// GET ALL DOCTORS
// ==========================================

router.get(
    "/",
    authenticate,
    authorize(
        "PATIENT",
        "STAFF",
        "DOCTOR",
        "ADMIN"
    ),
    getAllDoctors
);


// ==========================================
// GET OWN DOCTOR PROFILE
// ==========================================

router.get(
    "/me/profile",
    authenticate,
    authorize("DOCTOR"),
    getMyDoctorProfile
);


// ==========================================
// UPDATE OWN DOCTOR PROFILE
// ==========================================

router.put(
    "/me/profile",
    authenticate,
    authorize("DOCTOR"),
    updateMyDoctorProfile
);


// ==========================================
// UPLOAD OWN DOCTOR PROFILE PHOTO
// ==========================================

router.post(
    "/me/profile/photo",
    authenticate,
    authorize("DOCTOR"),
    uploadProfilePhoto.single("profilePhoto"),
    uploadMyDoctorProfilePhoto
);


// ==========================================
// VIEW ONE DOCTOR PROFILE
// ==========================================

router.get(
    "/:doctorId",
    authenticate,
    authorize(
        "PATIENT",
        "STAFF",
        "DOCTOR",
        "ADMIN"
    ),
    getDoctorProfile
);


module.exports = router;