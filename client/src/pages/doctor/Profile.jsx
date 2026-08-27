import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import LogoutButton from "../../components/LogoutButton";

const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [doctor, setDoctor] = useState(null);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(
                    "/doctor-profile/me/profile"
                );

                setDoctor(
                    response.data?.doctor || null
                );
            } catch (error) {
                console.error(
                    "Doctor profile error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load doctor profile"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handlePhotoChange = async (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setError("");
        setSuccess("");

        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            setError(
                "Only JPG, JPEG, PNG and WEBP images are allowed."
            );

            event.target.value = "";
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError(
                "Profile photo must be smaller than 5 MB."
            );

            event.target.value = "";
            return;
        }

        const formData = new FormData();

        formData.append(
            "profilePhoto",
            file
        );

        setUploading(true);

        try {
            const response = await api.post(
                "/doctor-profile/me/profile/photo",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            setDoctor((previous) => ({
                ...previous,
                profilePhoto:
                    response.data?.profilePhoto
            }));

            setSuccess(
                response.data?.message ||
                "Profile photo uploaded successfully."
            );
        } catch (error) {
            console.error(
                "Doctor profile photo upload error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to upload profile photo."
            );
        } finally {
            setUploading(false);
            event.target.value = "";
        }
    };

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div
                    className="spinner-border"
                    style={{
                        color: "#6f42c1"
                    }}
                />
            </div>
        );
    }

    return (
        <div
            className="min-vh-100"
            style={{
                backgroundColor: "#f3effc"
            }}
        >
            <nav
                className="navbar navbar-dark shadow-sm"
                style={{
                    backgroundColor: "#6f42c1"
                }}
            >
                <div className="container">

                    <span className="navbar-brand fw-bold">
                        Netraya
                    </span>

                    <div className="d-flex align-items-center gap-2">

                        <span className="text-white">
                            My Profile
                        </span>

                        <LogoutButton />

                    </div>

                </div>
            </nav>

            <main className="container py-4">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                            navigate("/doctor")
                        }
                    >
                        ← Back to Dashboard
                    </button>

                    <button
                        type="button"
                        className="btn btn-netraya"
                        onClick={() =>
                            navigate(
                                "/doctor/profile/edit"
                            )
                        }
                    >
                        Edit Professional Profile
                    </button>

                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success">
                        {success}
                    </div>
                )}

                {doctor && (
                    <div className="row justify-content-center">

                        <div className="col-12 col-lg-8">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4 p-lg-5">

                                    {/* PROFILE PHOTO */}

                                    <div className="text-center mb-4">

                                        {doctor.profilePhoto ? (
                                            <img
                                                src={`http://localhost:5000${doctor.profilePhoto}`}
                                                alt={doctor.name}
                                                className="rounded-circle shadow-sm"
                                                style={{
                                                    width: "140px",
                                                    height: "140px",
                                                    objectFit: "cover",
                                                    border:
                                                        "4px solid #ffffff"
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm"
                                                style={{
                                                    width: "140px",
                                                    height: "140px",
                                                    backgroundColor:
                                                        "#6f42c1",
                                                    color: "#ffffff",
                                                    fontSize: "52px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {doctor.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    "D"}
                                            </div>
                                        )}

                                        <div className="mt-3">

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept=".jpg,.jpeg,.png,.webp"
                                                className="d-none"
                                                onChange={
                                                    handlePhotoChange
                                                }
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-netraya"
                                                onClick={() =>
                                                    fileInputRef.current?.click()
                                                }
                                                disabled={uploading}
                                            >
                                                {uploading
                                                    ? "Uploading..."
                                                    : doctor.profilePhoto
                                                        ? "Change Profile Photo"
                                                        : "Upload Profile Photo"}
                                            </button>

                                            <p className="text-muted small mt-2 mb-0">
                                                JPG, JPEG, PNG or WEBP · Maximum 5 MB
                                            </p>

                                        </div>

                                    </div>

                                    <hr />

                                    {/* PROFILE HEADER */}

                                    <div className="text-center mb-4">

                                        <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">

                                            <h2 className="fw-bold mb-0">
                                                {doctor.name ||
                                                    "Doctor"}
                                            </h2>

                                            <span
                                                className="badge"
                                                style={{
                                                    backgroundColor:
                                                        "#6f42c1",
                                                    color:
                                                        "#ffffff"
                                                }}
                                            >
                                                DOCTOR
                                            </span>

                                        </div>

                                        <p
                                            className="fw-semibold mt-2 mb-1"
                                            style={{
                                                color:
                                                    "#6f42c1"
                                            }}
                                        >
                                            {doctor.specialization ||
                                                "Ophthalmology"}
                                        </p>

                                        <p className="text-muted mb-0">
                                            {doctor.qualification ||
                                                "Qualification not added"}
                                        </p>

                                    </div>

                                    {/* ACCOUNT INFORMATION */}

                                    <h5
                                        className="fw-bold mb-3"
                                        style={{
                                            color:
                                                "#6f42c1"
                                        }}
                                    >
                                        Account Information
                                    </h5>

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <div className="bg-light rounded p-3">
                                                <small className="text-muted">
                                                    Phone
                                                </small>

                                                <div className="fw-semibold">
                                                    {doctor.phone ||
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="bg-light rounded p-3">
                                                <small className="text-muted">
                                                    User ID
                                                </small>

                                                <div className="fw-semibold">
                                                    {doctor.id ||
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* PROFESSIONAL DETAILS */}

                                    <h5
                                        className="fw-bold mt-5 mb-3"
                                        style={{
                                            color:
                                                "#6f42c1"
                                        }}
                                    >
                                        Professional Information
                                    </h5>

                                    <div className="row g-3">

                                        <div className="col-md-6">
                                            <div className="bg-light rounded p-3 h-100">
                                                <small className="text-muted">
                                                    Qualification
                                                </small>

                                                <div className="fw-semibold">
                                                    {doctor.qualification ||
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="bg-light rounded p-3 h-100">
                                                <small className="text-muted">
                                                    Specialization
                                                </small>

                                                <div className="fw-semibold">
                                                    {doctor.specialization ||
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="bg-light rounded p-3 h-100">
                                                <small className="text-muted">
                                                    Experience
                                                </small>

                                                <div
                                                    className="fw-bold"
                                                    style={{
                                                        color:
                                                            "#6f42c1"
                                                    }}
                                                >
                                                    {doctor.experienceYears !=
                                                    null
                                                        ? `${doctor.experienceYears} Years`
                                                        : "-"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="bg-light rounded p-3 h-100">
                                                <small className="text-muted">
                                                    Department
                                                </small>

                                                <div className="fw-semibold">
                                                    {doctor.department ||
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="bg-light rounded p-3 h-100">
                                                <small className="text-muted">
                                                    Languages
                                                </small>

                                                <div className="fw-semibold">
                                                    {doctor.languages ||
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="bg-light rounded p-3">
                                                <small className="text-muted">
                                                    Medical Registration Number
                                                </small>

                                                <div className="fw-semibold">
                                                    {doctor.medicalRegistrationNumber ||
                                                        "-"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="bg-light rounded p-3">
                                                <small className="text-muted">
                                                    Areas of Expertise
                                                </small>

                                                <div className="fw-semibold">
                                                    {doctor.expertise ||
                                                        "Not added"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="bg-light rounded p-3">
                                                <small className="text-muted">
                                                    About Doctor
                                                </small>

                                                <p className="mb-0 mt-1">
                                                    {doctor.bio ||
                                                        "Professional biography not added yet."}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    {/* PUBLIC PROFILE */}

                                    <div className="card border mt-5">

                                        <div className="card-body p-4">

                                            <h5 className="fw-bold mb-2">
                                                Public Verification Profile
                                            </h5>

                                            <p className="text-muted">
                                                Patients and staff can use this
                                                professional profile to verify
                                                your qualifications and experience.
                                            </p>

                                            <button
                                                type="button"
                                                className="btn btn-netraya"
                                                onClick={() =>
                                                    doctor.id &&
                                                    navigate(
                                                        `/doctor/profile/${doctor.id}`
                                                    )
                                                }
                                            >
                                                View Public Profile
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};

export default Profile;