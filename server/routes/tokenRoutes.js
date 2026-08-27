const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    generateToken,
    getTodayQueue,
    updateTokenStatus
} = require("../controllers/tokenController");


// ==========================================
// GENERATE TOKEN
// PATIENT / STAFF / ADMIN
// ==========================================

router.post(
    "/generate",
    authenticate,
    authorize(
        "PATIENT",
        "STAFF",
        "ADMIN"
    ),
    generateToken
);


// ==========================================
// GET TODAY'S QUEUE
// STAFF / DOCTOR / ADMIN
// ==========================================

router.get(
    "/today",
    authenticate,
    authorize(
        "STAFF",
        "DOCTOR",
        "ADMIN"
    ),
    getTodayQueue
);


// ==========================================
// UPDATE TOKEN STATUS
// STAFF / DOCTOR / ADMIN
// ==========================================

router.put(
    "/:tokenId/status",
    authenticate,
    authorize(
        "STAFF",
        "DOCTOR",
        "ADMIN"
    ),
    updateTokenStatus
);


module.exports = router;