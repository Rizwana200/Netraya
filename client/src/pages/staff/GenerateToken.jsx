import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const GenerateToken = () => {
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [source, setSource] = useState("WALK_IN");

    const [patient, setPatient] = useState(null);
    const [token, setToken] = useState(null);

    const [searching, setSearching] = useState(false);
    const [generating, setGenerating] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const searchPatient = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setPatient(null);
        setToken(null);

        if (!phone.trim()) {
            setError("Enter the patient's phone number.");
            return;
        }

        setSearching(true);

        try {
            const response = await api.get(
                `/patient-search/phone/${phone.trim()}`
            );

            setPatient(response.data?.patient || null);
        } catch (error) {
            console.error(
                "Patient search error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Patient not found."
            );
        } finally {
            setSearching(false);
        }
    };

    const generateToken = async () => {
        if (!patient) {
            setError("Search for a patient first.");
            return;
        }

        setGenerating(true);
        setError("");
        setSuccess("");
        setToken(null);

        try {
            const response = await api.post(
                "/tokens/generate",
                {
                    patientId: patient.id,
                    source
                }
            );

            setToken(response.data?.token || null);

            setSuccess(
                response.data?.message ||
                "Token generated successfully."
            );
        } catch (error) {
            console.error(
                "Token generation error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to generate token."
            );
        } finally {
            setGenerating(false);
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
                        Generate Token
                    </span>
                </div>
            </nav>

            <main className="container py-4">

                <button
                    type="button"
                    className="btn btn-outline-secondary mb-4"
                    onClick={() => navigate("/staff")}
                >
                    ← Back to Dashboard
                </button>

                <div className="row justify-content-center">

                    <div className="col-12 col-lg-8">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4 p-lg-5">

                                <h2 className="fw-bold mb-1">
                                    Generate Patient Token
                                </h2>

                                <p className="text-muted mb-4">
                                    Search the patient first, then issue today's token.
                                </p>

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

                                <form onSubmit={searchPatient}>

                                    <div className="row g-3 align-items-end">

                                        <div className="col-md-8">
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
                                                placeholder="Enter patient phone number"
                                                value={phone}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="col-md-4">

                                            <button
                                                type="submit"
                                                className="btn btn-netraya w-100"
                                                disabled={searching}
                                            >
                                                {searching
                                                    ? "Searching..."
                                                    : "Search Patient"}
                                            </button>

                                        </div>

                                    </div>

                                </form>

                                {patient && (
                                    <div className="card border mt-4">

                                        <div className="card-body p-4">

                                            <h5 className="fw-bold mb-1">
                                                {patient.name}
                                            </h5>

                                            <p className="text-muted mb-3">
                                                Phone: {patient.phone}
                                            </p>

                                            <div className="mb-3">

                                                <label
                                                    htmlFor="source"
                                                    className="form-label fw-semibold"
                                                >
                                                    Token Source
                                                </label>

                                                <select
                                                    id="source"
                                                    className="form-select"
                                                    value={source}
                                                    onChange={(e) =>
                                                        setSource(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="WALK_IN">
                                                        Walk-in
                                                    </option>

                                                    <option value="PHONE">
                                                        Phone
                                                    </option>

                                                    <option value="WEBSITE">
                                                        Website
                                                    </option>
                                                </select>

                                            </div>

                                            <button
                                                type="button"
                                                className="btn btn-netraya"
                                                onClick={generateToken}
                                                disabled={generating}
                                            >
                                                {generating
                                                    ? "Generating..."
                                                    : "Generate Token"}
                                            </button>

                                        </div>

                                    </div>
                                )}

                                {token && (
                                    <div className="text-center mt-4">

                                        <div
                                            className="card border-0 shadow-sm"
                                            style={{
                                                backgroundColor: "#f3effc"
                                            }}
                                        >

                                            <div className="card-body p-4">

                                                <p className="text-muted mb-2">
                                                    Token Generated
                                                </p>

                                                <h1
                                                    className="display-3 fw-bold"
                                                    style={{
                                                        color: "#6f42c1"
                                                    }}
                                                >
                                                    #{token.tokenNumber}
                                                </h1>

                                                <p className="mb-1">
                                                    Patient:{" "}
                                                    {patient.name}
                                                </p>

                                                <p className="mb-1">
                                                    Source:{" "}
                                                    {token.source}
                                                </p>

                                                <span
                                                    className="badge"
                                                    style={{
                                                        backgroundColor:
                                                            "#6f42c1",
                                                        color: "#ffffff"
                                                    }}
                                                >
                                                    {token.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default GenerateToken;