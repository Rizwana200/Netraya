import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const DoctorDocuments = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await api.get(
                    `/documents/patient/${patientId}`
                );

                setDocuments(
                    response.data?.documents || []
                );

            } catch (error) {
                console.error(
                    "Doctor documents error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load patient documents"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
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
                        Patient Documents
                    </span>
                </div>
            </nav>

            <main className="container py-4">

                <button
                    className="btn btn-outline-secondary mb-4"
                    onClick={() =>
                        navigate(
                            `/doctor/patient/${patientId}`
                        )
                    }
                >
                    ← Back to Patient
                </button>

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div>
                                <h3 className="fw-bold mb-1">
                                    Patient Documents
                                </h3>

                                <p className="text-muted mb-0">
                                    Prescriptions, reports and eye scans
                                </p>
                            </div>

                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: "#f3effc",
                                    color: "#6f42c1"
                                }}
                            >
                                {documents.length} document
                                {documents.length === 1 ? "" : "s"}
                            </span>

                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        {!error && documents.length === 0 && (
                            <div className="text-center py-5">

                                <h5>
                                    No documents found
                                </h5>

                                <p className="text-muted mb-0">
                                    This patient has no uploaded documents.
                                </p>

                            </div>
                        )}

                        <div className="row g-4">

                            {documents.map((document) => (
                                <div
                                    className="col-12 col-md-6 col-lg-4"
                                    key={document.id}
                                >
                                    <div className="card border h-100">

                                        <div className="card-body p-4">

                                            <div
                                                className="rounded-circle d-flex align-items-center justify-content-center mb-3"
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    backgroundColor: "#f3effc",
                                                    color: "#6f42c1",
                                                    fontSize: "22px"
                                                }}
                                            >
                                                📄
                                            </div>

                                            <h6 className="fw-bold">
                                                {document.documentName ||
                                                    document.fileName ||
                                                    "Document"}
                                            </h6>

                                            <p className="text-muted small mb-2">
                                                Type:{" "}
                                                {document.documentType || "-"}
                                            </p>

                                            <p className="text-muted small">
                                                Uploaded:{" "}
                                                {document.uploadedAt
                                                    ? new Date(
                                                        document.uploadedAt
                                                    ).toLocaleDateString()
                                                    : "-"}
                                            </p>

                                            {document.filePath && (
                                                <a
                                                    href={`http://localhost:5000/${document.filePath}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-netraya w-100"
                                                >
                                                    View Document
                                                </a>
                                            )}

                                        </div>

                                    </div>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default DoctorDocuments;