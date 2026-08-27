import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";


// ===============================
// PUBLIC PAGES
// ===============================

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import RoleRoute from "./components/RoleRoute";


// ===============================
// PATIENT
// ===============================

import PatientDashboard from "./pages/patient/PatientDashboard";
import PatientProfile from "./pages/patient/Profile";
import GenerateToken from "./pages/patient/GenerateToken";
import EyeHistory from "./pages/patient/EyeHistory";
import Documents from "./pages/patient/Documents";
import Bills from "./pages/patient/Bills";


// ===============================
// DOCTOR
// ===============================

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorPatientProfile from "./pages/doctor/DoctorPatientProfile";
import EyeExamination from "./pages/doctor/EyeExamination";
import DoctorDocuments from "./pages/doctor/Documents";
import PatientSearch from "./pages/doctor/PatientSearch";
import DoctorProfile from "./pages/doctor/Profile";
import DoctorProfessionalProfile from "./pages/doctor/DoctorProfessionalProfile";
import Doctors from "./pages/doctor/Doctors";
import EditProfile from "./pages/doctor/EditProfile";


// ===============================
// STAFF
// ===============================

import StaffDashboard from "./pages/staff/StaffDashboard";
import StaffProfile from "./pages/staff/Profile";
import RegisterPatient from "./pages/staff/RegisterPatient";
import GenerateStaffToken from "./pages/staff/GenerateToken";
import Patients from "./pages/staff/Patients";
import StaffPatientProfile from "./pages/staff/PatientProfile";
import Queue from "./pages/staff/Queue";
import Billing from "./pages/staff/Billing";
import Excel from "./pages/staff/Excel";
import TokenLimit from "./pages/staff/TokenLimit";


const App = () => {

    return (

        <BrowserRouter>

            <Routes>


                {/* =================================================
                    PUBLIC
                ================================================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =================================================
                    PATIENT
                ================================================= */}

                <Route
                    path="/patient"
                    element={
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        >
                            <PatientDashboard />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/patient/profile"
                    element={
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        >
                            <PatientProfile />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/patient/generate-token"
                    element={
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        >
                            <GenerateToken />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/patient/eye-history"
                    element={
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        >
                            <EyeHistory />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/patient/documents"
                    element={
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        >
                            <Documents />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/patient/bills"
                    element={
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        >
                            <Bills />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/patient/doctors"
                    element={
                        <RoleRoute
                            allowedRoles={["PATIENT"]}
                        >
                            <Doctors />
                        </RoleRoute>
                    }
                />



                {/* =================================================
                    DOCTOR
                ================================================= */}

                <Route
                    path="/doctor"
                    element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        >
                            <DoctorDashboard />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/doctor/profile"
                    element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        >
                            <DoctorProfile />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/doctor/profile/edit"
                    element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        >
                            <EditProfile />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/doctor/profile/:doctorId"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "PATIENT",
                                "STAFF",
                                "DOCTOR",
                                "ADMIN"
                            ]}
                        >
                            <DoctorProfessionalProfile />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/doctor/search"
                    element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        >
                            <PatientSearch />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/doctor/patient/:patientId"
                    element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        >
                            <DoctorPatientProfile />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/doctor/examination/:patientId"
                    element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        >
                            <EyeExamination />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/doctor/documents/:patientId"
                    element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        >
                            <DoctorDocuments />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/doctor/doctors"
                    element={
                        <RoleRoute
                            allowedRoles={["DOCTOR"]}
                        >
                            <Doctors />
                        </RoleRoute>
                    }
                />



                {/* =================================================
                    STAFF
                ================================================= */}

                <Route
                    path="/staff"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <StaffDashboard />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/profile"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <StaffProfile />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/register-patient"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <RegisterPatient />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/generate-token"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <GenerateStaffToken />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/patients"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <Patients />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/patient/:patientId"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <StaffPatientProfile />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/queue"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <Queue />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/billing"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <Billing />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/excel"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <Excel />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/token-limit"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <TokenLimit />
                        </RoleRoute>
                    }
                />


                <Route
                    path="/staff/doctors"
                    element={
                        <RoleRoute
                            allowedRoles={[
                                "STAFF",
                                "ADMIN"
                            ]}
                        >
                            <Doctors />
                        </RoleRoute>
                    }
                />



                {/* =================================================
                    INVALID URL
                ================================================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );
};


export default App;