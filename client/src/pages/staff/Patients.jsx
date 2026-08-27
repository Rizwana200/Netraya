import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Patients = () => {
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();

        setPatient(null);
        setError("");

        if (!phone.trim()) {
            setError("Enter a patient phone number.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.get(
                `/patient-search/phone/${phone.trim()}`
            );

            setPatient(
                response.data?.patient || null
            );

        } catch (error) {
            console.error(
                "Patient search error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Patient not found"
            );

        } finally {
            setLoading(false);
        }
    };

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
                        Patients
                    </span>
                </div>
            </nav>

            <main className="container py-4">

                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate("/staff")}
                >
                    ← Back to Dashboard
                </button>

                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 p-lg-5">

                        <h2 className="fw-bold mb-1">
                            Search Patient
                        </h2>

                        <p className="text-muted mb-4">
                            Search an existing patient using their phone number.
                        </p>

                        <form onSubmit={handleSearch}>

                            <div className="row g-3 align-items-end">

                                <div className="col-md-9">

                                    <label
                                        htmlFor="phone"
                                        className="form-label fw-semibold"
                                    >
                                        Patient Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />

                                </div>

                                <div className="col-md-3">

                                    <button
                                        type="submit"
                                        className="btn btn-netraya w-100"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Searching..."
                                            : "Search"}
                                    </button>

                                </div>

                            </div>

                        </form>

                        {error && (
                            <div className="alert alert-danger mt-4">
                                {error}
                            </div>
                        )}

                        {patient && (
                            <div className="card border mt-4">

                                <div className="card-body p-4">

                                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

                                        <div>

                                            <h4 className="fw-bold mb-1">
                                                {patient.name}
                                            </h4>

                                            <p className="text-muted mb-1">
                                                Phone: {patient.phone}
                                            </p>

                                            <p className="text-muted mb-0">
                                                Patient ID: {patient.id}
                                            </p>

                                        </div>

                                        <div className="d-flex gap-2">

                                            <button
                                                className="btn btn-netraya"
                                                onClick={() =>
                                                    navigate(
                                                        `/staff/patient/${patient.id}`
                                                    )
                                                }
                                            >
                                                View Patient
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        )}

                    </div>
                </div>

            </main>
        </div>
    );
};

export default Patients;