const express = require("express");

const router = express.Router();

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const upload = require("../config/upload");

const {
    uploadDocument,
    getPatientDocuments,
    getDocument
} = require("../controllers/documentController");


// ==========================================
// UPLOAD DOCUMENT
// ==========================================

router.post(

    "/patient/:patientId",

    authenticate,

    authorize(
        "STAFF",
        "DOCTOR"
    ),

    upload.single("document"),

    uploadDocument

);


// ==========================================
// GET PATIENT DOCUMENTS
// ==========================================

router.get(

    "/patient/:patientId",

    authenticate,

    authorize(
        "STAFF",
        "DOCTOR",
        "PATIENT",
        "ADMIN"
    ),

    getPatientDocuments

);


// ==========================================
// GET SINGLE DOCUMENT
// ==========================================

router.get(

    "/:documentId",

    authenticate,

    authorize(
        "STAFF",
        "DOCTOR",
        "PATIENT",
        "ADMIN"
    ),

    getDocument

);


module.exports = router;