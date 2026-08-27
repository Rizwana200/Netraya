const express = require("express");

const router = express.Router();

const {
    createStaffOrDoctor
} = require("../controllers/userController");

router.post("/create", createStaffOrDoctor);

module.exports = router;