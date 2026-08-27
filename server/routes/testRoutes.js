const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

router.get(
    "/profile",
    authenticate,
    (req, res) => {
        res.json({
            message: "Authentication successful",
            user: req.user
        });
    }
);

router.get(
    "/staff",
    authenticate,
    authorize("STAFF", "ADMIN"),
    (req, res) => {
        res.json({
            message: "Staff access successful",
            user: req.user
        });
    }
);

router.get(
    "/doctor",
    authenticate,
    authorize("DOCTOR", "ADMIN"),
    (req, res) => {
        res.json({
            message: "Doctor access successful",
            user: req.user
        });
    }
);

module.exports = router;