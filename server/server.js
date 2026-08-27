const express = require("express");
const cors = require("cors");

const { sequelize } = require("./models");

const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
const clinicRoutes = require("./routes/clinicRoutes");
const tokenRoutes = require("./routes/tokenRoutes");
const eyeVisitRoutes = require("./routes/eyeVisitRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const doctorProfileRoutes = require("./routes/doctorProfileRoutes");
const staffRoutes = require("./routes/staffRoutes");
const patientDashboardRoutes = require("./routes/patientDashboardRoutes");
const patientProfileRoutes = require("./routes/patientProfileRoutes");
const billingRoutes = require("./routes/billingRoutes");
const documentRoutes = require("./routes/documentRoutes");
const historyRoutes = require("./routes/historyRoutes");
const patientSearchRoutes = require("./routes/patientSearchRoutes");
const excelRoutes = require("./routes/excelRoutes");

const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// STATIC FILES
// ==========================================

app.use(
    "/uploads",
    express.static("uploads")
);


// ==========================================
// API ROUTES
// ==========================================

app.use(
    "/api/patients",
    patientRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/test",
    testRoutes
);

app.use(
    "/api/users",
    userRoutes
);

app.use(
    "/api/clinic",
    clinicRoutes
);

app.use(
    "/api/tokens",
    tokenRoutes
);

app.use(
    "/api/eye-visits",
    eyeVisitRoutes
);

app.use(
    "/api/doctor",
    doctorRoutes
);

app.use(
    "/api/doctor-profile",
    doctorProfileRoutes
);

app.use(
    "/api/staff",
    staffRoutes
);

app.use(
    "/api/patient-dashboard",
    patientDashboardRoutes
);

app.use(
    "/api/patient-profile",
    patientProfileRoutes
);

app.use(
    "/api/billing",
    billingRoutes
);

app.use(
    "/api/documents",
    documentRoutes
);

app.use(
    "/api/history",
    historyRoutes
);

app.use(
    "/api/patient-search",
    patientSearchRoutes
);

app.use(
    "/api/excel",
    excelRoutes
);


// ==========================================
// ROOT
// ==========================================

app.get("/", (req, res) => {

    res.json({
        message:
            "Netraya Eye Clinic API is running"
    });

});


// ==========================================
// DATABASE
// ==========================================

sequelize
    .sync()
    .then(() => {

        console.log(
            "✅ MySQL connected"
        );

        console.log(
            "✅ Netraya tables synchronized"
        );

    })
    .catch((error) => {

        console.error(
            "❌ Database error:",
            error.message
        );

    });


// ==========================================
// START SERVER
// ==========================================

const PORT = 5000;

app.listen(
    PORT,
    () => {

        console.log(
            `🚀 Netraya server running on http://localhost:${PORT}`
        );

    }
);