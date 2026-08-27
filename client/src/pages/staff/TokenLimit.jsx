import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const TokenLimit = () => {
    const navigate = useNavigate();

    const [dailyTokenLimit, setDailyTokenLimit] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchLimit = async () => {
            try {
                const response = await api.get(
                    "/clinic/token-limit"
                );

                setDailyTokenLimit(
                    response.data?.dailyTokenLimit ?? ""
                );
            } catch (error) {
                console.error(
                    "Token limit error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load token limit"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLimit();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const limit = Number(dailyTokenLimit);

        if (!limit || limit < 1) {
            setError(
                "Daily token limit must be at least 1."
            );
            return;
        }

        setSaving(true);

        try {
            const response = await api.put(
                "/clinic/token-limit",
                {
                    dailyTokenLimit: limit
                }
            );

            setDailyTokenLimit(
                response.data?.dailyTokenLimit ?? limit
            );

            setSuccess(
                response.data?.message ||
                "Daily token limit updated successfully."
            );
        } catch (error) {
            console.error(
                "Update token limit error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update token limit"
            );
        } finally {
            setSaving(false);
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

                    <span className="text-white">
                        Token Limit
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

                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4 p-lg-5">

                                <h2 className="fw-bold mb-1">
                                    Daily Token Limit
                                </h2>

                                <p className="text-muted mb-4">
                                    Set the maximum number of tokens
                                    the clinic can issue today.
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

                                <form onSubmit={handleSubmit}>

                                    <div className="mb-4">

                                        <label
                                            htmlFor="dailyTokenLimit"
                                            className="form-label fw-semibold"
                                        >
                                            Daily Token Limit
                                        </label>

                                        <input
                                            type="number"
                                            id="dailyTokenLimit"
                                            className="form-control form-control-lg"
                                            min="1"
                                            value={dailyTokenLimit}
                                            onChange={(e) =>
                                                setDailyTokenLimit(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                        <small className="text-muted">
                                            Example: 50 patients per day
                                        </small>

                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-netraya w-100"
                                        disabled={saving}
                                    >
                                        {saving
                                            ? "Saving..."
                                            : "Save Token Limit"}
                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default TokenLimit;