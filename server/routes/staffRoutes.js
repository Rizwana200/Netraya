const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    getStaffDashboard,
    getMyStaffProfile
} = require("../controllers/staffController");

const uploadProfilePhoto =
    require("../middleware/uploadProfilePhoto");

const {
    uploadMyStaffProfilePhoto
} = require("../controllers/staffProfilePhotoController");


// ==========================================
// STAFF DASHBOARD
// ==========================================

router.get(
    "/dashboard",
    authenticate,
    authorize("STAFF"),
    getStaffDashboard
);


// ==========================================
// MY STAFF PROFILE
// ==========================================

router.get(
    "/profile",
    authenticate,
    authorize("STAFF"),
    getMyStaffProfile
);


// ==========================================
// STAFF PROFILE PHOTO
// ==========================================

router.post(
    "/profile/photo",
    authenticate,
    authorize("STAFF"),
    uploadProfilePhoto.single("profilePhoto"),
    uploadMyStaffProfilePhoto
);


module.exports = router;