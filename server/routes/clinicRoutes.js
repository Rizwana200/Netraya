const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    setDailyTokenLimit,
    getDailyTokenLimit
} = require("../controllers/clinicController");

router.put(
    "/token-limit",
    authenticate,
    authorize("STAFF", "ADMIN"),
    setDailyTokenLimit
);

router.get(
    "/token-limit",
    authenticate,
    authorize("STAFF", "ADMIN", "DOCTOR"),
    getDailyTokenLimit
);

module.exports = router;