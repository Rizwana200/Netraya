import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import LogoutButton from "../../components/LogoutButton";

const StaffDashboard = () => {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await api.get(
                    "/staff/dashboard"
                );

                setDashboard(response.data);
            } catch (error) {
                console.error(
                    "Staff dashboard error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load staff dashboard"
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
                </div>
            </div>
        );
    }

    const summary = dashboard?.summary || {};

    const headerButtonStyle = {
        backgroundColor: "#ffffff",
        color: "#6f42c1",
        border: "1px solid #ffffff"
    };

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

                        <button
                            type="button"
                            className="btn btn-sm"
                            style={headerButtonStyle}
                            onClick={() =>
                                navigate(
                                    "/staff/profile"
                                )
                            }
                        >
                            Profile
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm"
                            style={headerButtonStyle}
                            onClick={() =>
                                navigate(
                                    "/staff/doctors"
                                )
                            }
                        >
                            Our Doctors
                        </button>

                        <LogoutButton />

                    </div>

                </div>
            </nav>

            {/* MAIN */}

            <main className="container py-4">

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Staff Dashboard
                    </h2>

                    <p className="text-muted">
                        Manage today's eye-clinic operations
                    </p>

                </div>

                {/* MAIN SUMMARY */}

                <div className="row g-3 mb-4">

                    <div className="col-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Daily Token Limit
                                </small>

                                <h3
                                    className="fw-bold mt-2"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    {dashboard?.tokenLimit ?? 0}
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Tokens Issued
                                </small>

                                <h3 className="fw-bold mt-2">
                                    {summary.total ?? 0}
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Waiting
                                </small>

                                <h3 className="fw-bold mt-2">
                                    {summary.waiting ?? 0}
                                </h3>

                            </div>

                        </div>

                    </div>

                    <div className="col-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Completed
                                </small>

                                <h3 className="fw-bold mt-2">
                                    {summary.completed ?? 0}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>

                {/* SECONDARY SUMMARY */}

                <div className="row g-3 mb-4">

                    <div className="col-6 col-md-3">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">
                                    Called
                                </small>

                                <h4 className="fw-bold mt-2">
                                    {summary.called ?? 0}
                                </h4>

                            </div>

                        </div>

                    </div>

                    <div className="col-6 col-md-3">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">
                                    With Doctor
                                </small>

                                <h4 className="fw-bold mt-2">
                                    {summary.withDoctor ?? 0}
                                </h4>

                            </div>

                        </div>

                    </div>

                    <div className="col-6 col-md-3">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">
                                    Cancelled
                                </small>

                                <h4 className="fw-bold mt-2">
                                    {summary.cancelled ?? 0}
                                </h4>

                            </div>

                        </div>

                    </div>

                    <div className="col-6 col-md-3">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">
                                    Remaining
                                </small>

                                <h4
                                    className="fw-bold mt-2"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    {summary.remainingTokens ?? 0}
                                </h4>

                            </div>

                        </div>

                    </div>

                </div>

                {/* CLINIC OPERATIONS */}

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        <h4 className="fw-bold mb-4">
                            Clinic Operations
                        </h4>

                        <div className="row g-3">

                            <div className="col-12 col-md-4">

                                <div className="card border h-100">

                                    <div className="card-body p-4">

                                        <h5 className="fw-bold">
                                            Register Patient
                                        </h5>

                                        <p className="text-muted">
                                            Create a new patient account.
                                        </p>

                                        <button
                                            className="btn btn-netraya"
                                            onClick={() =>
                                                navigate(
                                                    "/staff/register-patient"
                                                )
                                            }
                                        >
                                            Register Patient
                                        </button>

                                    </div>

                                </div>

                            </div>

                            <div className="col-12 col-md-4">

                                <div className="card border h-100">

                                    <div className="card-body p-4">

                                        <h5 className="fw-bold">
                                            Generate Token
                                        </h5>

                                        <p className="text-muted">
                                            Search a patient and issue today's token.
                                        </p>

                                        <button
                                            className="btn btn-netraya"
                                            onClick={() =>
                                                navigate(
                                                    "/staff/generate-token"
                                                )
                                            }
                                        >
                                            Generate Token
                                        </button>

                                    </div>

                                </div>

                            </div>

                            <div className="col-12 col-md-4">

                                <div className="card border h-100">

                                    <div className="card-body p-4">

                                        <h5 className="fw-bold">
                                            Patient Search
                                        </h5>

                                        <p className="text-muted">
                                            Find an existing patient.
                                        </p>

                                        <button
                                            className="btn btn-netraya"
                                            onClick={() =>
                                                navigate(
                                                    "/staff/patients"
                                                )
                                            }
                                        >
                                            Search Patients
                                        </button>

                                    </div>

                                </div>

                            </div>

                            <div className="col-12 col-md-4">

                                <div className="card border h-100">

                                    <div className="card-body p-4">

                                        <h5 className="fw-bold">
                                            Today's Queue
                                        </h5>

                                        <p className="text-muted">
                                            Manage today's patient queue.
                                        </p>

                                        <button
                                            className="btn btn-netraya"
                                            onClick={() =>
                                                navigate(
                                                    "/staff/queue"
                                                )
                                            }
                                        >
                                            View Queue
                                        </button>

                                    </div>

                                </div>

                            </div>

                            <div className="col-12 col-md-4">

                                <div className="card border h-100">

                                    <div className="card-body p-4">

                                        <h5 className="fw-bold">
                                            Billing
                                        </h5>

                                        <p className="text-muted">
                                            Manage patient billing and payments.
                                        </p>

                                        <button
                                            className="btn btn-netraya"
                                            onClick={() =>
                                                navigate(
                                                    "/staff/billing"
                                                )
                                            }
                                        >
                                            Billing
                                        </button>

                                    </div>

                                </div>

                            </div>

                            <div className="col-12 col-md-4">

                                <div className="card border h-100">

                                    <div className="card-body p-4">

                                        <h5 className="fw-bold">
                                            Daily Excel
                                        </h5>

                                        <p className="text-muted">
                                            Export today's token list.
                                        </p>

                                        <button
                                            className="btn btn-netraya"
                                            onClick={() =>
                                                navigate(
                                                    "/staff/excel"
                                                )
                                            }
                                        >
                                            Export Excel
                                        </button>

                                    </div>

                                </div>

                            </div>

                            <div className="col-12 col-md-4">

                                <div className="card border h-100">

                                    <div className="card-body p-4">

                                        <h5 className="fw-bold">
                                            Token Limit
                                        </h5>

                                        <p className="text-muted">
                                            Set today's clinic token limit.
                                        </p>

                                        <button
                                            className="btn btn-netraya"
                                            onClick={() =>
                                                navigate(
                                                    "/staff/token-limit"
                                                )
                                            }
                                        >
                                            Manage Limit
                                        </button>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default StaffDashboard;