import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const PatientProfile = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get(
                    `/history/patient/${patientId}`
                );

                setData(response.data);
            } catch (error) {
                console.error(
                    "Staff patient profile error:",
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

        fetchHistory();
    }, [patientId]);

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div
                    className="spinner-border"
                    style={{ color: "#6f42c1" }}
                />
            </div>
        );
    }

    return (
        <div
            className="min-vh-100"
            style={{ backgroundColor: "#f3effc" }}
        >
            <nav
                className="navbar navbar-dark shadow-sm"
                style={{ backgroundColor: "#6f42c1" }}
            >
                <div className="container">
                    <span className="navbar-brand fw-bold">
                        Netraya
                    </span>

                    <span className="text-white">
                        Patient Profile
                    </span>
                </div>
            </nav>

            <main className="container py-4">

                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate("/staff/patients")}
                >
                    ← Back
                </button>

                {error ? (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">

                                <h2 className="fw-bold mb-1">
                                    {data?.patient?.name || "Patient"}
                                </h2>

                                <p className="text-muted mb-1">
                                    Phone: {data?.patient?.phone || "-"}
                                </p>

                                <p className="text-muted mb-0">
                                    Patient ID: {data?.patient?.id || patientId}
                                </p>

                            </div>
                        </div>

                        <div className="row g-3 mb-4">

                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <small className="text-muted">
                                            Eye Visits
                                        </small>

                                        <h3 className="fw-bold mt-2">
                                            {data?.totalVisits ?? 0}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <small className="text-muted">
                                            Documents
                                        </small>

                                        <h3 className="fw-bold mt-2">
                                            {data?.totalDocuments ?? 0}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-body">
                                        <small className="text-muted">
                                            Bills
                                        </small>

                                        <h3 className="fw-bold mt-2">
                                            {data?.totalBills ?? 0}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="d-flex gap-2 flex-wrap">

                            <button
                                className="btn btn-netraya"
                                onClick={() =>
                                    navigate("/staff/billing")
                                }
                            >
                                Billing
                            </button>

                            <button
                                className="btn btn-outline-secondary"
                                onClick={() =>
                                    navigate("/staff/queue")
                                }
                            >
                                Today's Queue
                            </button>

                        </div>
                    </>
                )}

            </main>
        </div>
    );
};

export default PatientProfile;