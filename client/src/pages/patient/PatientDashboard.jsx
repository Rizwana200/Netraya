import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import LogoutButton from "../../components/LogoutButton";

const PatientDashboard = () => {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get(
                    "/patient-dashboard"
                );

                setDashboard(response.data);
            } catch (error) {
                console.error(
                    "Dashboard error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load dashboard"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
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

    if (error) {
        return (
            <div className="min-vh-100 bg-light p-4">
                <div className="container">
                    <div className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    const rawToken =
        dashboard?.today?.token;

    const todayToken =
        typeof rawToken === "object" &&
        rawToken !== null
            ? rawToken.tokenNumber
            : rawToken;

    const currentToken =
        typeof dashboard?.today?.currentToken === "object" &&
        dashboard?.today?.currentToken !== null
            ? dashboard.today.currentToken.tokenNumber
            : dashboard?.today?.currentToken;

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

                        <button
                            type="button"
                            className="btn btn-sm"
                            style={{
                                backgroundColor: "#ffffff",
                                color: "#6f42c1",
                                border: "1px solid #ffffff"
                            }}
                            onClick={() =>
                                navigate("/patient/profile")
                            }
                        >
                            Profile
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm"
                            style={{
                                backgroundColor: "#ffffff",
                                color: "#6f42c1",
                                border: "1px solid #ffffff"
                            }}
                            onClick={() =>
                                navigate("/patient/doctors")
                            }
                        >
                            Our Doctors
                        </button>

                        <LogoutButton />

                    </div>

                </div>
            </nav>

            {/* =========================
                MAIN
            ========================= */}

            <main className="container py-4">

                {/* WELCOME */}

                <div className="mb-4">
                    <h2 className="fw-bold">
                        Welcome,{" "}
                        {dashboard?.patient?.name || "Patient"}
                    </h2>

                    <p className="text-muted">
                        Your Netraya Eye Clinic dashboard
                    </p>
                </div>

                {/* =========================
                    TOKEN ACTION
                ========================= */}

                <div
                    className="card border-0 shadow-sm mb-4"
                    style={{
                        borderLeft: "5px solid #6f42c1"
                    }}
                >
                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Today's Clinic Token
                                </h4>

                                {todayToken ? (
                                    <p className="text-muted mb-0">
                                        You already have today's token:{" "}
                                        <strong
                                            style={{
                                                color: "#6f42c1"
                                            }}
                                        >
                                            #{todayToken}
                                        </strong>
                                    </p>
                                ) : (
                                    <p className="text-muted mb-0">
                                        Generate your token before visiting
                                        the eye clinic.
                                    </p>
                                )}

                            </div>

                            <button
                                type="button"
                                className="btn btn-netraya px-4"
                                onClick={() =>
                                    navigate(
                                        "/patient/generate-token"
                                    )
                                }
                            >
                                {todayToken
                                    ? "View My Token"
                                    : "Generate My Token"}
                            </button>

                        </div>

                    </div>
                </div>

                {/* =========================
                    QUEUE
                ========================= */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <div>
                                <h4 className="fw-bold mb-1">
                                    Today's Queue
                                </h4>

                                <p className="text-muted mb-0">
                                    {dashboard?.today?.date || "-"}
                                </p>
                            </div>

                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: "#f3effc",
                                    color: "#6f42c1"
                                }}
                            >
                                Queue Status
                            </span>

                        </div>

                        <div className="row g-3">

                            {/* MY TOKEN */}

                            <div className="col-6 col-lg-3">

                                <div className="card border-0 bg-light h-100">

                                    <div className="card-body text-center">

                                        <p className="text-muted mb-2">
                                            My Token
                                        </p>

                                        <h2
                                            className="fw-bold"
                                            style={{
                                                color: "#6f42c1"
                                            }}
                                        >
                                            {todayToken || "-"}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                            {/* CURRENT TOKEN */}

                            <div className="col-6 col-lg-3">

                                <div className="card border-0 bg-light h-100">

                                    <div className="card-body text-center">

                                        <p className="text-muted mb-2">
                                            Current Token
                                        </p>

                                        <h2 className="fw-bold">
                                            {currentToken ?? "-"}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                            {/* PATIENTS AHEAD */}

                            <div className="col-6 col-lg-3">

                                <div className="card border-0 bg-light h-100">

                                    <div className="card-body text-center">

                                        <p className="text-muted mb-2">
                                            Patients Ahead
                                        </p>

                                        <h2 className="fw-bold">
                                            {dashboard?.today?.patientsAhead ?? 0}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                            {/* TOTAL TOKENS */}

                            <div className="col-6 col-lg-3">

                                <div className="card border-0 bg-light h-100">

                                    <div className="card-body text-center">

                                        <p className="text-muted mb-2">
                                            Today's Tokens
                                        </p>

                                        <h2 className="fw-bold">
                                            {dashboard?.today?.totalTokens ?? 0}
                                        </h2>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* TOKEN CAPACITY */}

                        <div className="mt-4">

                            <div className="d-flex justify-content-between mb-2">

                                <span className="text-muted">
                                    Daily token capacity
                                </span>

                                <span className="fw-semibold">
                                    {dashboard?.today?.remainingTokens ?? 0} remaining
                                </span>

                            </div>

                            <div className="progress">

                                <div
                                    className="progress-bar"
                                    style={{
                                        backgroundColor: "#6f42c1",
                                        width:
                                            dashboard?.today?.tokenLimit
                                                ? `${Math.min(
                                                    100,
                                                    (dashboard.today.totalTokens /
                                                        dashboard.today.tokenLimit) *
                                                    100
                                                )}%`
                                                : "0%"
                                    }}
                                />

                            </div>

                        </div>

                    </div>
                </div>

                {/* =========================
                    FEATURES
                ========================= */}

                <div className="row g-4">

                    {/* EYE HISTORY */}

                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h5 className="fw-bold">
                                    👁 Eye History
                                </h5>

                                <p className="text-muted">
                                    View previous eye examinations,
                                    diagnosis and prescriptions.
                                </p>

                                <button
                                    className="btn btn-netraya"
                                    onClick={() =>
                                        navigate(
                                            "/patient/eye-history"
                                        )
                                    }
                                >
                                    View Eye History
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* DOCUMENTS */}

                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h5 className="fw-bold">
                                    📄 Documents
                                </h5>

                                <p className="text-muted">
                                    Access prescriptions,
                                    reports and eye documents.
                                </p>

                                <button
                                    className="btn btn-netraya"
                                    onClick={() =>
                                        navigate(
                                            "/patient/documents"
                                        )
                                    }
                                >
                                    View Documents
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* BILLS */}

                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h5 className="fw-bold">
                                    💳 Bills
                                </h5>

                                <p className="text-muted">
                                    View checkup, spectacles
                                    and payment information.
                                </p>

                                <button
                                    className="btn btn-netraya"
                                    onClick={() =>
                                        navigate(
                                            "/patient/bills"
                                        )
                                    }
                                >
                                    View Bills
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* OUR DOCTORS */}

                    <div className="col-12 col-md-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body p-4">

                                <h5 className="fw-bold">
                                    👨‍⚕️ Our Doctors
                                </h5>

                                <p className="text-muted">
                                    View qualifications,
                                    experience and professional
                                    verification details.
                                </p>

                                <button
                                    className="btn btn-netraya"
                                    onClick={() =>
                                        navigate(
                                            "/patient/doctors"
                                        )
                                    }
                                >
                                    View Doctors
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
};

export default PatientDashboard;