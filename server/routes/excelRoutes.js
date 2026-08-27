const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    exportTodayTokens
} = require("../controllers/excelController");


// ==========================================
// EXPORT TODAY'S TOKENS
// ==========================================

router.get(
    "/today-tokens",
    authenticate,
    authorize("STAFF", "ADMIN"),
    exportTodayTokens
);


module.exports = router;