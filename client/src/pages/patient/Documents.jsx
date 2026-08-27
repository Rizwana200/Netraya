import { useEffect, useState } from "react";
import api from "../../services/api";

const Documents = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                // Get logged-in patient's actual patient ID
                const dashboardResponse = await api.get(
                    "/patient-dashboard"
                );

                const patientId =
                    dashboardResponse.data?.patient?.id;

                if (!patientId) {
                    throw new Error(
                        "Patient profile not found"
                    );
                }

                // Get this patient's documents
                const response = await api.get(
                    `/documents/patient/${patientId}`
                );

                setDocuments(
                    response.data?.documents || []
                );

            } catch (error) {
                console.error(
                    "Documents error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Unable to load documents"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center">
                <div
                    className="spinner-border"
                    style={{ color: "#6f42c1" }}
                ></div>
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
                        Documents
                    </span>
                </div>
            </nav>

            <main className="container py-4">

                <h2 className="fw-bold mb-1">
                    My Documents
                </h2>

                <p className="text-muted mb-4">
                    Prescriptions, reports and eye-related documents
                </p>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!error && documents.length === 0 && (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center p-5">

                            <h5>
                                No documents found
                            </h5>

                            <p className="text-muted mb-0">
                                Your uploaded eye documents will appear here.
                            </p>

                        </div>
                    </div>
                )}

                <div className="row g-4">

                    {documents.map((document) => (
                        <div
                            className="col-12 col-md-6 col-lg-4"
                            key={document.id}
                        >
                            <div className="card border-0 shadow-sm h-100">

                                <div className="card-body p-4">

                                    <div className="d-flex align-items-center mb-3">

                                        <div
                                            className="rounded-circle d-flex align-items-center justify-content-center me-3"
                                            style={{
                                                width: "45px",
                                                height: "45px",
                                                backgroundColor: "#f3effc",
                                                color: "#6f42c1",
                                                fontSize: "20px"
                                            }}
                                        >
                                            📄
                                        </div>

                                        <div>

                                            <h6 className="fw-bold mb-1">
                                                {document.documentName ||
                                                    document.fileName ||
                                                    "Eye Document"}
                                            </h6>

                                            <small className="text-muted">
                                                {document.documentType ||
                                                    "Document"}
                                            </small>

                                        </div>

                                    </div>

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

            </main>
        </div>
    );
};

export default Documents;