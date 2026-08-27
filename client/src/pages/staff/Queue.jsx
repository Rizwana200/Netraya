import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Queue = () => {
    const navigate = useNavigate();

    const [queue, setQueue] = useState([]);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingToken, setUpdatingToken] = useState(null);

    const fetchQueue = async () => {
        try {
            const response = await api.get("/tokens/today");

            setQueue(response.data?.queue || []);
            setSummary(response.data?.summary || null);
        } catch (error) {
            console.error("Queue error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load today's queue"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueue();
    }, []);

    const updateStatus = async (tokenId, status) => {
        try {
            setUpdatingToken(tokenId);
            setError("");

            await api.put(
                `/tokens/${tokenId}/status`,
                { status }
            );

            await fetchQueue();
        } catch (error) {
            console.error("Status update error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to update token status"
            );
        } finally {
            setUpdatingToken(null);
        }
    };

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
                        Today's Queue
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

                <div className="mb-4">
                    <h2 className="fw-bold">
                        Today's Queue
                    </h2>

                    <p className="text-muted">
                        Manage patient token status.
                    </p>
                </div>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {summary && (
                    <div className="row g-3 mb-4">

                        <div className="col-6 col-lg-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <small className="text-muted">
                                        Total
                                    </small>

                                    <h3 className="fw-bold mt-2">
                                        {summary.total ?? 0}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-lg-3">
                            <div className="card border-0 shadow-sm">
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
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <small className="text-muted">
                                        With Doctor
                                    </small>

                                    <h3 className="fw-bold mt-2">
                                        {summary.withDoctor ?? 0}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="col-6 col-lg-3">
                            <div className="card border-0 shadow-sm">
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
                )}

                <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">

                        {queue.length === 0 ? (
                            <div className="text-center py-5">
                                <h5>
                                    No tokens today
                                </h5>

                                <p className="text-muted mb-0">
                                    No patients are currently in the queue.
                                </p>
                            </div>
                        ) : (
                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0">

                                    <thead
                                        style={{
                                            backgroundColor: "#f3effc"
                                        }}
                                    >
                                        <tr>
                                            <th className="px-4">
                                                Token
                                            </th>

                                            <th>
                                                Patient
                                            </th>

                                            <th>
                                                Phone
                                            </th>

                                            <th>
                                                Source
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {queue.map((token) => (

                                            <tr key={token.tokenId}>

                                                <td className="px-4 fw-bold">
                                                    #{token.tokenNumber}
                                                </td>

                                                <td>
                                                    {token.patient?.name || "-"}
                                                </td>

                                                <td>
                                                    {token.patient?.phone || "-"}
                                                </td>

                                                <td>
                                                    {token.source || "-"}
                                                </td>

                                                <td>
                                                    <span
                                                        className="badge"
                                                        style={{
                                                            backgroundColor:
                                                                token.status === "COMPLETED"
                                                                    ? "#198754"
                                                                    : token.status === "WITH_DOCTOR"
                                                                        ? "#6f42c1"
                                                                        : token.status === "CALLED"
                                                                            ? "#0d6efd"
                                                                            : token.status === "CANCELLED" ||
                                                                                token.status === "NO_SHOW"
                                                                                ? "#dc3545"
                                                                                : "#ffc107",
                                                            color:
                                                                token.status === "WAITING"
                                                                    ? "#212529"
                                                                    : "#ffffff"
                                                        }}
                                                    >
                                                        {token.status}
                                                    </span>
                                                </td>

                                                <td>

                                                    {token.status === "WAITING" && (
                                                        <button
                                                            className="btn btn-sm btn-netraya me-2"
                                                            disabled={
                                                                updatingToken === token.tokenId
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    token.tokenId,
                                                                    "CALLED"
                                                                )
                                                            }
                                                        >
                                                            Call
                                                        </button>
                                                    )}

                                                    {token.status === "CALLED" && (
                                                        <button
                                                            className="btn btn-sm btn-netraya me-2"
                                                            disabled={
                                                                updatingToken === token.tokenId
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    token.tokenId,
                                                                    "WITH_DOCTOR"
                                                                )
                                                            }
                                                        >
                                                            With Doctor
                                                        </button>
                                                    )}

                                                    {token.status === "WITH_DOCTOR" && (
                                                        <button
                                                            className="btn btn-sm btn-success me-2"
                                                            disabled={
                                                                updatingToken === token.tokenId
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    token.tokenId,
                                                                    "COMPLETED"
                                                                )
                                                            }
                                                        >
                                                            Complete
                                                        </button>
                                                    )}

                                                    {(token.status === "WAITING" ||
                                                        token.status === "CALLED") && (
                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            disabled={
                                                                updatingToken === token.tokenId
                                                            }
                                                            onClick={() =>
                                                                updateStatus(
                                                                    token.tokenId,
                                                                    "NO_SHOW"
                                                                )
                                                            }
                                                        >
                                                            No Show
                                                        </button>
                                                    )}

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>
                        )}

                    </div>
                </div>

            </main>
        </div>
    );
};

export default Queue;