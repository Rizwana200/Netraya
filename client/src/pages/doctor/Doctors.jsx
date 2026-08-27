import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const Doctors = () => {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get(
                    "/doctor-profile"
                );

                setDoctors(
                    response.data?.doctors || []
                );
            } catch (error) {
                console.error(
                    "Doctors directory error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load doctors"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

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

                    <span className="text-white">
                        Our Doctors
                    </span>
                </div>
            </nav>

            <main className="container py-4">

                <button
                    type="button"
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="mb-4">
                    <h2 className="fw-bold">
                        Our Eye Specialists
                    </h2>

                    <p className="text-muted">
                        View professional profiles and verify our doctors.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!error && doctors.length === 0 && (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center p-5">
                            <h5>
                                No doctors found
                            </h5>

                            <p className="text-muted mb-0">
                                Doctor profiles will appear here.
                            </p>
                        </div>
                    </div>
                )}

                <div className="row g-4">

                    {doctors.map((doctor) => (
                        <div
                            className="col-12 col-md-6 col-lg-4"
                            key={doctor.id}
                        >
                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body p-4">

                                    <div className="text-center mb-3">

                                        {doctor.profilePhoto ? (
                                            <img
                                                src={
                                                    doctor.profilePhoto.startsWith(
                                                        "http"
                                                    )
                                                        ? doctor.profilePhoto
                                                        : `http://localhost:5000/${doctor.profilePhoto}`
                                                }
                                                alt={doctor.name}
                                                className="rounded-circle"
                                                style={{
                                                    width: "90px",
                                                    height: "90px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        ) : (
                                            <div
                                                className="rounded-circle d-inline-flex align-items-center justify-content-center"
                                                style={{
                                                    width: "90px",
                                                    height: "90px",
                                                    backgroundColor: "#6f42c1",
                                                    color: "#fff",
                                                    fontSize: "32px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {doctor.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "D"}
                                            </div>
                                        )}

                                    </div>

                                    <div className="text-center">

                                        <h5 className="fw-bold mb-1">
                                            {doctor.name}
                                        </h5>

                                        <p
                                            className="fw-semibold mb-1"
                                            style={{
                                                color: "#6f42c1"
                                            }}
                                        >
                                            {doctor.specialization ||
                                                "Ophthalmology"}
                                        </p>

                                        <p className="text-muted mb-1">
                                            {doctor.qualification ||
                                                "Qualification not added"}
                                        </p>

                                        <p className="text-muted small">
                                            {doctor.experienceYears != null
                                                ? `${doctor.experienceYears} years experience`
                                                : "Experience not added"}
                                        </p>

                                    </div>

                                    <button
                                        className="btn btn-netraya w-100 mt-3"
                                        onClick={() =>
                                            navigate(
                                                `/doctor/profile/${doctor.id}`
                                            )
                                        }
                                    >
                                        View Professional Profile
                                    </button>

                                </div>

                            </div>
                        </div>
                    ))}

                </div>

            </main>
        </div>
    );
};

export default Doctors;