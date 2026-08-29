import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import LogoutButton from "../../components/LogoutButton";

const DoctorProfessionalProfile = () => {

    const navigate = useNavigate();

    const { doctorId } = useParams();

    const [doctor, setDoctor] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const fetchDoctorProfile = async () => {

            try {

                const response = await api.get(
                    `/doctor-profile/${doctorId}`
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


        fetchDoctorProfile();

    }, [doctorId]);


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


    if (error) {

        return (

            <div
                className="min-vh-100 p-4"
                style={{
                    backgroundColor: "#f3effc"
                }}
            >

                <div className="container">

                    <div className="alert alert-danger">
                        {error}
                    </div>

                    <button
                        className="btn btn-netraya"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        Go Back
                    </button>

                </div>

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

            {/* =========================
                NAVBAR
            ========================= */}

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
                            Doctor Profile
                        </span>

                        <LogoutButton />

                    </div>

                </div>

            </nav>


            <main className="container py-4">


                {/* BACK */}

                <button
                    type="button"
                    className="btn btn-outline-secondary mb-4"
                    onClick={() =>
                        navigate(-1)
                    }
                >
                    ← Back
                </button>


                {/* =========================
                    PROFILE HEADER
                ========================= */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4 p-lg-5">

                        <div className="row align-items-center g-4">


                            <div className="col-auto">

                                {doctor?.profilePhoto ? (

                                    <img
    src={
        doctor.profilePhoto.startsWith("http")
            ? doctor.profilePhoto
            : `http://localhost:5000${doctor.profilePhoto}`
    }
    alt={doctor.name}
    className="rounded-circle"
    style={{
        width: "120px",
        height: "120px",
        objectFit: "cover",
    }}
/>

                                ) : (

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            backgroundColor: "#6f42c1",
                                            color: "#ffffff",
                                            fontSize: "42px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        {doctor?.name
                                            ?.charAt(0)
                                            ?.toUpperCase() || "D"}
                                    </div>

                                )}

                            </div>


                            <div className="col">

                                <div className="d-flex align-items-center gap-2 flex-wrap">

                                    <h1 className="fw-bold mb-1">
                                        {doctor?.name || "Doctor"}
                                    </h1>

                                    <span
                                        className="badge"
                                        style={{
                                            backgroundColor:
                                                "#6f42c1",
                                            color:
                                                "#ffffff"
                                        }}
                                    >
                                        VERIFIED PROFILE
                                    </span>

                                </div>


                                <p
                                    className="mb-2 fw-semibold"
                                    style={{
                                        color:
                                            "#6f42c1"
                                    }}
                                >
                                    {doctor?.specialization ||
                                        "Ophthalmology"}
                                </p>


                                <p className="text-muted mb-2">
                                    {doctor?.qualification ||
                                        "Qualification not added"}
                                </p>


                                <p className="text-muted mb-0">
                                    {doctor?.experienceYears != null
                                        ? `${doctor.experienceYears} years of experience`
                                        : "Experience not added"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    PROFESSIONAL DETAILS
                ========================= */}

                <div className="row g-4">


                    {/* QUALIFICATION */}

                    <div className="col-12 col-md-6">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color:
                                            "#6f42c1"
                                    }}
                                >
                                    Qualification
                                </h5>

                                <p className="mb-0">
                                    {doctor?.qualification ||
                                        "Not added"}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* SPECIALIZATION */}

                    <div className="col-12 col-md-6">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color:
                                            "#6f42c1"
                                    }}
                                >
                                    Specialization
                                </h5>

                                <p className="mb-0">
                                    {doctor?.specialization ||
                                        "Not added"}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* EXPERIENCE */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h6 className="text-muted">
                                    Experience
                                </h6>

                                <h3
                                    className="fw-bold"
                                    style={{
                                        color:
                                            "#6f42c1"
                                    }}
                                >
                                    {doctor?.experienceYears != null
                                        ? `${doctor.experienceYears} Years`
                                        : "-"}
                                </h3>

                            </div>

                        </div>

                    </div>


                    {/* DEPARTMENT */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h6 className="text-muted">
                                    Department
                                </h6>

                                <h5 className="fw-bold">
                                    {doctor?.department ||
                                        "Ophthalmology"}
                                </h5>

                            </div>

                        </div>

                    </div>


                    {/* LANGUAGES */}

                    <div className="col-12 col-md-4">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h6 className="text-muted">
                                    Languages
                                </h6>

                                <h5 className="fw-bold">
                                    {doctor?.languages ||
                                        "Not added"}
                                </h5>

                            </div>

                        </div>

                    </div>


                    {/* EXPERTISE */}

                    <div className="col-12">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color:
                                            "#6f42c1"
                                    }}
                                >
                                    Areas of Expertise
                                </h5>

                                <p className="mb-0">
                                    {doctor?.expertise ||
                                        "Areas of expertise have not been added yet."}
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* REGISTRATION NUMBER */}

                    <div className="col-12 col-md-6">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4">

                                <h6 className="text-muted">
                                    Medical Registration Number
                                </h6>

                                <h5 className="fw-bold mb-0">
                                    {doctor?.medicalRegistrationNumber ||
                                        "Not added"}
                                </h5>

                            </div>

                        </div>

                    </div>


                    {/* ABOUT */}

                    <div className="col-12 col-md-6">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color:
                                            "#6f42c1"
                                    }}
                                >
                                    About the Doctor
                                </h5>

                                <p className="mb-0">
                                    {doctor?.bio ||
                                        "Doctor introduction has not been added yet."}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

};


export default DoctorProfessionalProfile;