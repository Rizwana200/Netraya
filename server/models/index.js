const sequelize = require("../config/database");

const User = require("./User");
const Patient = require("./Patient");
const Token = require("./Token");
const ClinicSetting = require("./ClinicSetting");
const EyeVisit = require("./EyeVisit");
const Bill = require("./Bill");
const Document = require("./Document");


// ===============================
// USER → PATIENT
// ===============================

User.hasOne(Patient, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

Patient.belongsTo(User, {
    foreignKey: "userId"
});


// ===============================
// PATIENT → TOKENS
// ===============================

Patient.hasMany(Token, {
    foreignKey: "patientId",
    onDelete: "CASCADE"
});

Token.belongsTo(Patient, {
    foreignKey: "patientId"
});


// ===============================
// PATIENT → EYE VISITS
// ===============================

Patient.hasMany(EyeVisit, {
    foreignKey: "patientId",
    onDelete: "CASCADE"
});

EyeVisit.belongsTo(Patient, {
    foreignKey: "patientId"
});


// ===============================
// DOCTOR → EYE VISITS
// ===============================

User.hasMany(EyeVisit, {
    foreignKey: "doctorId",
    onDelete: "SET NULL"
});

EyeVisit.belongsTo(User, {
    as: "Doctor",
    foreignKey: "doctorId"
});


// ===============================
// PATIENT → BILLS
// ===============================

Patient.hasMany(Bill, {
    foreignKey: "patientId",
    onDelete: "CASCADE"
});

Bill.belongsTo(Patient, {
    foreignKey: "patientId"
});


// ===============================
// PATIENT → DOCUMENTS
// ===============================

Patient.hasMany(Document, {
    foreignKey: "patientId",
    onDelete: "CASCADE"
});

Document.belongsTo(Patient, {
    foreignKey: "patientId"
});


// ===============================
// EYE VISIT → DOCUMENTS
// ===============================

EyeVisit.hasMany(Document, {
    foreignKey: "eyeVisitId",
    onDelete: "SET NULL"
});

Document.belongsTo(EyeVisit, {
    foreignKey: "eyeVisitId"
});


// ===============================
// USER → DOCUMENTS
// ===============================

User.hasMany(Document, {
    foreignKey: "uploadedBy",
    onDelete: "SET NULL"
});

Document.belongsTo(User, {
    as: "Uploader",
    foreignKey: "uploadedBy"
});


module.exports = {
    sequelize,
    User,
    Patient,
    Token,
    ClinicSetting,
    EyeVisit,
    Bill,
    Document
};