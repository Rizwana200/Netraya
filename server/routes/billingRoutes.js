const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const {
    createBill,
    getPatientBills,
    updateBillPayment
} = require("../controllers/billingController");


// ==========================================
// STAFF CREATES BILL
// ==========================================

router.post(
    "/patient/:patientId",
    authenticate,
    authorize("STAFF"),
    createBill
);


// ==========================================
// STAFF / DOCTOR / ADMIN / PATIENT
// VIEW BILLS
// ==========================================

router.get(
    "/patient/:patientId",
    authenticate,
    authorize(
        "STAFF",
        "DOCTOR",
        "ADMIN",
        "PATIENT"
    ),
    getPatientBills
);


// ==========================================
// STAFF UPDATES PAYMENT
// ==========================================

router.put(
    "/:billId/payment",
    authenticate,
    authorize("STAFF"),
    updateBillPayment
);


module.exports = router;