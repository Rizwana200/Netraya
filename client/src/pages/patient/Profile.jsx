import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import LogoutButton from "../../components/LogoutButton";

const Profile = () => {
    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(
                    "/patient-profile/me"
                );

                setPatient(
                    response.data?.patient || null
                );
            } catch (error) {
                console.error(
                    "Patient profile error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load patient profile"
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
                "/patient-profile/me/photo",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            const profilePhoto =
                response.data?.profilePhoto;

            setPatient((previous) => ({
                ...previous,
                profilePhoto
            }));

            setSuccess(
                response.data?.message ||
                "Profile photo uploaded successfully."
            );

        } catch (error) {
            console.error(
                "Profile photo upload error:",
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
            {/* NAVBAR */}

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

                <button
                    type="button"
                    className="btn btn-outline-secondary mb-4"
                    onClick={() =>
                        navigate("/patient")
                    }
                >
                    ← Back to Dashboard
                </button>

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

                {patient && (
                    <div className="row justify-content-center">

                        <div className="col-12 col-lg-8">

                            <div className="card border-0 shadow-sm">

                                <div className="card-body p-4 p-lg-5">

                                    {/* PROFILE PHOTO */}

                                    <div className="text-center mb-4">

                                        {patient.profilePhoto ? (
                                            <img
                                                src={`http://localhost:5000${patient.profilePhoto}`}
                                                alt={patient.name}
                                                className="rounded-circle shadow-sm"
                                                style={{
                                                    width: "130px",
                                                    height: "130px",
                                                    objectFit: "cover",
                                                    border:
                                                        "4px solid #ffffff"
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm"
                                                style={{
                                                    width: "130px",
                                                    height: "130px",
                                                    backgroundColor:
                                                        "#6f42c1",
                                                    color: "#ffffff",
                                                    fontSize: "48px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {patient.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() ||
                                                    "P"}
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
                                                    : patient.profilePhoto
                                                        ? "Change Profile Photo"
                                                        : "Upload Profile Photo"}
                                            </button>

                                            <p className="text-muted small mt-2 mb-0">
                                                JPG, JPEG, PNG or WEBP · Maximum 5 MB
                                            </p>

                                        </div>

                                    </div>

                                    <hr />

                                    {/* PATIENT DETAILS */}

                                    <h5
                                        className="fw-bold mb-3"
                                        style={{
                                            color: "#6f42c1"
                                        }}
                                    >
                                        Personal Information
                                    </h5>

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3">

                                                <small className="text-muted">
                                                    Full Name
                                                </small>

                                                <div className="fw-semibold">
                                                    {patient.name || "-"}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3">

                                                <small className="text-muted">
                                                    Phone
                                                </small>

                                                <div className="fw-semibold">
                                                    {patient.phone || "-"}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3">

                                                <small className="text-muted">
                                                    Date of Birth
                                                </small>

                                                <div className="fw-semibold">
                                                    {patient.dateOfBirth || "-"}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3">

                                                <small className="text-muted">
                                                    Gender
                                                </small>

                                                <div className="fw-semibold">
                                                    {patient.gender || "-"}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-12">

                                            <div className="bg-light rounded p-3">

                                                <small className="text-muted">
                                                    Address
                                                </small>

                                                <div className="fw-semibold">
                                                    {patient.address || "-"}
                                                </div>

                                            </div>

                                        </div>

                                        <div className="col-12">

                                            <div className="bg-light rounded p-3">

                                                <small className="text-muted">
                                                    Patient ID
                                                </small>

                                                <div className="fw-semibold">
                                                    {patient.id || "-"}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-4">

                                        <button
                                            type="button"
                                            className="btn btn-netraya"
                                            onClick={() =>
                                                navigate(
                                                    "/patient/doctors"
                                                )
                                            }
                                        >
                                            View Our Doctors
                                        </button>

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