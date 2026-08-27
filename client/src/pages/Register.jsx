import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";


const Register = () => {

    const navigate = useNavigate();


    const [role, setRole] = useState("PATIENT");

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",

        dateOfBirth: "",
        gender: "",
        address: "",

        qualification: "",
        specialization: "",
        experienceYears: "",
        expertise: "",
        medicalRegistrationNumber: "",
        languages: "",
        department: "",
        bio: ""
    });


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData({
            ...formData,
            [name]: value
        });

    };


    // ==========================================
    // CHANGE ROLE
    // ==========================================

    const handleRoleChange = (newRole) => {

        setRole(newRole);

        setError("");
        setSuccess("");

    };


    // ==========================================
    // REGISTER
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // Password validation

        if (
            formData.password !==
            formData.confirmPassword
        ) {

            setError(
                "Passwords do not match"
            );

            return;

        }


        if (
            formData.password.length < 6
        ) {

            setError(
                "Password must contain at least 6 characters"
            );

            return;

        }


        try {

            setLoading(true);


            const data = {

                name:
                    formData.name,

                phone:
                    formData.phone,

                password:
                    formData.password,

                role

            };


            // ==========================================
            // PATIENT DATA
            // ==========================================

            if (role === "PATIENT") {

                data.dateOfBirth =
                    formData.dateOfBirth || null;

                data.gender =
                    formData.gender || null;

                data.address =
                    formData.address || null;

            }


            // ==========================================
            // DOCTOR DATA
            // ==========================================

            if (role === "DOCTOR") {

                data.qualification =
                    formData.qualification;

                data.specialization =
                    formData.specialization;

                data.experienceYears =
                    formData.experienceYears
                        ? Number(formData.experienceYears)
                        : null;

                data.expertise =
                    formData.expertise;

                data.medicalRegistrationNumber =
                    formData.medicalRegistrationNumber;

                data.languages =
                    formData.languages;

                data.department =
                    formData.department;

                data.bio =
                    formData.bio;

            }


            // ==========================================
            // STAFF DATA
            // ==========================================

            if (role === "STAFF") {

                data.department =
                    formData.department;

            }


            const response =
                await api.post(
                    "/auth/register",
                    data
                );


            setSuccess(
                response.data?.message ||
                "Registration successful"
            );


            // Clear form

            setFormData({

                name: "",
                phone: "",
                password: "",
                confirmPassword: "",

                dateOfBirth: "",
                gender: "",
                address: "",

                qualification: "",
                specialization: "",
                experienceYears: "",
                expertise: "",
                medicalRegistrationNumber: "",
                languages: "",
                department: "",
                bio: ""

            });


            // Go to login

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center py-5"
            style={{
                backgroundColor: "#f3effc"
            }}
        >

            <div
                className="card border-0 shadow"
                style={{
                    width: "100%",
                    maxWidth: "700px"
                }}
            >

                <div className="card-body p-4 p-md-5">


                    {/* ======================================
                        HEADER
                    ====================================== */}

                    <div className="text-center mb-4">

                        <h2
                            className="fw-bold"
                            style={{
                                color: "#6f42c1"
                            }}
                        >
                            Netraya
                        </h2>

                        <p className="text-muted mb-0">
                            Create your account
                        </p>

                    </div>


                    {/* ======================================
                        ROLE SELECTOR
                    ====================================== */}

                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Register as
                        </label>


                        <div className="row g-2">

                            <div className="col-4">

                                <button
                                    type="button"
                                    className="btn w-100"
                                    onClick={() =>
                                        handleRoleChange(
                                            "PATIENT"
                                        )
                                    }
                                    style={{
                                        backgroundColor:
                                            role === "PATIENT"
                                                ? "#6f42c1"
                                                : "#ffffff",

                                        color:
                                            role === "PATIENT"
                                                ? "#ffffff"
                                                : "#6f42c1",

                                        border:
                                            "1px solid #6f42c1"
                                    }}
                                >
                                    Patient
                                </button>

                            </div>


                            <div className="col-4">

                                <button
                                    type="button"
                                    className="btn w-100"
                                    onClick={() =>
                                        handleRoleChange(
                                            "DOCTOR"
                                        )
                                    }
                                    style={{
                                        backgroundColor:
                                            role === "DOCTOR"
                                                ? "#6f42c1"
                                                : "#ffffff",

                                        color:
                                            role === "DOCTOR"
                                                ? "#ffffff"
                                                : "#6f42c1",

                                        border:
                                            "1px solid #6f42c1"
                                    }}
                                >
                                    Doctor
                                </button>

                            </div>


                            <div className="col-4">

                                <button
                                    type="button"
                                    className="btn w-100"
                                    onClick={() =>
                                        handleRoleChange(
                                            "STAFF"
                                        )
                                    }
                                    style={{
                                        backgroundColor:
                                            role === "STAFF"
                                                ? "#6f42c1"
                                                : "#ffffff",

                                        color:
                                            role === "STAFF"
                                                ? "#ffffff"
                                                : "#6f42c1",

                                        border:
                                            "1px solid #6f42c1"
                                    }}
                                >
                                    Staff
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* ======================================
                        ERROR
                    ====================================== */}

                    {error && (

                        <div className="alert alert-danger">
                            {error}
                        </div>

                    )}


                    {/* ======================================
                        SUCCESS
                    ====================================== */}

                    {success && (

                        <div className="alert alert-success">
                            {success}
                        </div>

                    )}


                    {/* ======================================
                        FORM
                    ====================================== */}

                    <form onSubmit={handleSubmit}>


                        {/* BASIC INFORMATION */}

                        <h5
                            className="fw-bold mb-3"
                            style={{
                                color: "#6f42c1"
                            }}
                        >
                            Basic Information
                        </h5>


                        <div className="row g-3">


                            {/* NAME */}

                            <div className="col-md-6">

                                <label className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* PHONE */}

                            <div className="col-md-6">

                                <label className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* PASSWORD */}

                            <div className="col-md-6">

                                <label className="form-label">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />

                            </div>


                            {/* CONFIRM PASSWORD */}

                            <div className="col-md-6">

                                <label className="form-label">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className="form-control"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        {/* ======================================
                            PATIENT FIELDS
                        ====================================== */}

                        {role === "PATIENT" && (

                            <div className="mt-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    Patient Information
                                </h5>


                                <div className="row g-3">


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Date of Birth
                                        </label>

                                        <input
                                            type="date"
                                            name="dateOfBirth"
                                            className="form-control"
                                            value={
                                                formData.dateOfBirth
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Gender
                                        </label>

                                        <select
                                            name="gender"
                                            className="form-select"
                                            value={
                                                formData.gender
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        >

                                            <option value="">
                                                Select gender
                                            </option>

                                            <option value="MALE">
                                                Male
                                            </option>

                                            <option value="FEMALE">
                                                Female
                                            </option>

                                            <option value="OTHER">
                                                Other
                                            </option>

                                        </select>

                                    </div>


                                    <div className="col-12">

                                        <label className="form-label">
                                            Address
                                        </label>

                                        <textarea
                                            name="address"
                                            className="form-control"
                                            rows="3"
                                            value={
                                                formData.address
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* ======================================
                            DOCTOR FIELDS
                        ====================================== */}

                        {role === "DOCTOR" && (

                            <div className="mt-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    Doctor Information
                                </h5>


                                <div className="row g-3">


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Qualification
                                        </label>

                                        <input
                                            type="text"
                                            name="qualification"
                                            className="form-control"
                                            value={
                                                formData.qualification
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Specialization
                                        </label>

                                        <input
                                            type="text"
                                            name="specialization"
                                            className="form-control"
                                            value={
                                                formData.specialization
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Experience (Years)
                                        </label>

                                        <input
                                            type="number"
                                            name="experienceYears"
                                            className="form-control"
                                            value={
                                                formData.experienceYears
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            min="0"
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Medical Registration Number
                                        </label>

                                        <input
                                            type="text"
                                            name="medicalRegistrationNumber"
                                            className="form-control"
                                            value={
                                                formData.medicalRegistrationNumber
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Languages
                                        </label>

                                        <input
                                            type="text"
                                            name="languages"
                                            className="form-control"
                                            placeholder="English, Telugu, Hindi"
                                            value={
                                                formData.languages
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label">
                                            Department
                                        </label>

                                        <input
                                            type="text"
                                            name="department"
                                            className="form-control"
                                            value={
                                                formData.department
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>


                                    <div className="col-12">

                                        <label className="form-label">
                                            Expertise
                                        </label>

                                        <textarea
                                            name="expertise"
                                            className="form-control"
                                            rows="2"
                                            value={
                                                formData.expertise
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>


                                    <div className="col-12">

                                        <label className="form-label">
                                            Bio
                                        </label>

                                        <textarea
                                            name="bio"
                                            className="form-control"
                                            rows="3"
                                            value={
                                                formData.bio
                                            }
                                            onChange={
                                                handleChange
                                            }
                                        />

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* ======================================
                            STAFF FIELDS
                        ====================================== */}

                        {role === "STAFF" && (

                            <div className="mt-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    Staff Information
                                </h5>


                                <div className="row g-3">

                                    <div className="col-12">

                                        <label className="form-label">
                                            Department
                                        </label>

                                        <input
                                            type="text"
                                            name="department"
                                            className="form-control"
                                            placeholder="Reception"
                                            value={
                                                formData.department
                                            }
                                            onChange={
                                                handleChange
                                            }
                                            required
                                        />

                                    </div>

                                </div>

                            </div>

                        )}


                        {/* ======================================
                            REGISTER BUTTON
                        ====================================== */}

                        <button
                            type="submit"
                            className="btn w-100 mt-4"
                            disabled={loading}
                            style={{
                                backgroundColor: "#6f42c1",
                                color: "#ffffff"
                            }}
                        >

                            {loading
                                ? "Creating Account..."
                                : `Register as ${role}`}

                        </button>


                    </form>


                    {/* ======================================
                        LOGIN
                    ====================================== */}

                    <div className="text-center mt-4">

                        <span className="text-muted">
                            Already have an account?
                        </span>{" "}

                        <button
                            type="button"
                            className="btn btn-link p-0"
                            onClick={() =>
                                navigate("/login")
                            }
                            style={{
                                color: "#6f42c1"
                            }}
                        >
                            Login
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Register;