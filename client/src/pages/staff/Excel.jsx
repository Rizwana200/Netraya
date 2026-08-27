import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Excel = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const downloadExcel = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.get(
                "/excel/today-tokens",
                {
                    responseType: "blob"
                }
            );

            // If backend returns an error as JSON,
            // read it instead of downloading it.
            const contentType =
                response.headers["content-type"] || "";

            if (
                !contentType.includes(
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                )
            ) {
                const text = await response.data.text();

                let message = "Excel download failed.";

                try {
                    const data = JSON.parse(text);

                    message =
                        data.message ||
                        data.error ||
                        message;
                } catch {
                    if (text) {
                        message = text;
                    }
                }

                throw new Error(message);
            }

            const url = window.URL.createObjectURL(
                response.data
            );

            const link = document.createElement("a");

            link.href = url;

            link.download =
                `netraya-tokens-${
                    new Date()
                        .toISOString()
                        .split("T")[0]
                }.xlsx`;

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);

            setSuccess(
                "Today's token Excel file downloaded successfully."
            );

        } catch (error) {
            console.error(
                "Excel download error:",
                error
            );

            setError(
                error.message ||
                error.response?.data?.message ||
                "Unable to download today's token Excel file."
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
                        Daily Excel
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

                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-5 text-center">

                                <div
                                    className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        backgroundColor: "#f3effc",
                                        color: "#6f42c1",
                                        fontSize: "30px"
                                    }}
                                >
                                    📊
                                </div>

                                <h2 className="fw-bold">
                                    Daily Token Excel
                                </h2>

                                <p className="text-muted">
                                    Download today's Netraya eye-clinic
                                    patient token list.
                                </p>

                                <div className="card bg-light border-0 my-4">

                                    <div className="card-body">

                                        <div className="row g-3">

                                            <div className="col-6">
                                                <small className="text-muted">
                                                    Date
                                                </small>

                                                <div className="fw-bold">
                                                    {new Date().toLocaleDateString()}
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <small className="text-muted">
                                                    File
                                                </small>

                                                <div className="fw-bold">
                                                    .xlsx
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {error && (
                                    <div className="alert alert-danger text-start">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="alert alert-success text-start">
                                        {success}
                                    </div>
                                )}

                                <button
                                    type="button"
                                    className="btn btn-netraya btn-lg px-5"
                                    onClick={downloadExcel}
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Preparing Excel..."
                                        : "Download Today's Excel"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default Excel;