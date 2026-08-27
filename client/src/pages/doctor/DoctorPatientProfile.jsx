import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

const DoctorPatientProfile = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPatientProfile = async () => {
            try {
                const response = await api.get(
                    `/doctor/patient/${patientId}`
                );

                setData(response.data);
            } catch (error) {
                console.error(
                    "Patient profile error:",
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

        fetchPatientProfile();
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

    if (error) {
        return (
            <div
                className="min-vh-100 p-4"
                style={{ backgroundColor: "#f3effc" }}
            >
                <div className="container">
                    <div className="alert alert-danger">
                        {error}
                    </div>

                    <button
                        className="btn btn-netraya"
                        onClick={() => navigate("/doctor")}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const patient = data?.patient;
    const visits = data?.eyeHistory?.visits || [];

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
                    onClick={() => navigate("/doctor")}
                >
                    ← Back
                </button>

                {/* Patient information */}

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                            <div>
                                <h2 className="fw-bold mb-1">
                                    {patient?.name || "Patient"}
                                </h2>

                                <p className="text-muted mb-0">
                                    Patient ID: {patient?.id || "-"}
                                </p>
                            </div>

                            <button
                                className="btn btn-netraya"
                                onClick={() =>
                                    navigate(
                                        `/doctor/examination/${patient?.id}`
                                    )
                                }
                            >
                                New Eye Examination
                            </button>

                        </div>

                        <hr />

                        <div className="row g-3">

                            <div className="col-md-4">
                                <small className="text-muted">
                                    Phone
                                </small>

                                <div className="fw-semibold">
                                    {patient?.phone || "-"}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <small className="text-muted">
                                    Date of Birth
                                </small>

                                <div className="fw-semibold">
                                    {patient?.dateOfBirth || "-"}
                                </div>
                            </div>

                            <div className="col-md-4">
                                <small className="text-muted">
                                    Gender
                                </small>

                                <div className="fw-semibold">
                                    {patient?.gender || "-"}
                                </div>
                            </div>

                            <div className="col-12">
                                <small className="text-muted">
                                    Address
                                </small>

                                <div className="fw-semibold">
                                    {patient?.address || "-"}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Eye history */}

                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <div>
                                <h4 className="fw-bold mb-1">
                                    Eye Examination History
                                </h4>

                                <p className="text-muted mb-0">
                                    Previous visits and clinical records
                                </p>
                            </div>

                            <span
                                className="badge rounded-pill"
                                style={{
                                    backgroundColor: "#f3effc",
                                    color: "#6f42c1"
                                }}
                            >
                                {visits.length} visit
                                {visits.length === 1 ? "" : "s"}
                            </span>

                        </div>

                        {visits.length === 0 ? (
                            <div className="text-center py-5">
                                <h5>
                                    No previous examinations
                                </h5>

                                <p className="text-muted mb-0">
                                    This patient has no recorded eye visits yet.
                                </p>
                            </div>
                        ) : (
                            visits.map((visit) => (
                                <div
                                    key={visit.id}
                                    className="border rounded p-4 mb-3"
                                >

                                    <div className="d-flex justify-content-between align-items-center mb-3">

                                        <div>
                                            <h5 className="fw-bold mb-1">
                                                Visit
                                            </h5>

                                            <small className="text-muted">
                                                {visit.visitDate}
                                            </small>
                                        </div>

                                        <span
                                            className="badge"
                                            style={{
                                                backgroundColor: "#f3effc",
                                                color: "#6f42c1"
                                            }}
                                        >
                                            {visit.diagnosis || "No diagnosis"}
                                        </span>

                                    </div>

                                    <div className="row g-3">

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3">

                                                <h6
                                                    className="fw-bold"
                                                    style={{
                                                        color: "#6f42c1"
                                                    }}
                                                >
                                                    Right Eye (OD)
                                                </h6>

                                                <p className="mb-1">
                                                    Visual Acuity:{" "}
                                                    {visit.rightVisualAcuity || "-"}
                                                </p>

                                                <p className="mb-1">
                                                    Sphere:{" "}
                                                    {visit.rightSphere || "-"}
                                                </p>

                                                <p className="mb-1">
                                                    Cylinder:{" "}
                                                    {visit.rightCylinder || "-"}
                                                </p>

                                                <p className="mb-1">
                                                    Axis:{" "}
                                                    {visit.rightAxis || "-"}
                                                </p>

                                                <p className="mb-0">
                                                    IOP:{" "}
                                                    {visit.rightIOP || "-"}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <div className="bg-light rounded p-3">

                                                <h6
                                                    className="fw-bold"
                                                    style={{
                                                        color: "#6f42c1"
                                                    }}
                                                >
                                                    Left Eye (OS)
                                                </h6>

                                                <p className="mb-1">
                                                    Visual Acuity:{" "}
                                                    {visit.leftVisualAcuity || "-"}
                                                </p>

                                                <p className="mb-1">
                                                    Sphere:{" "}
                                                    {visit.leftSphere || "-"}
                                                </p>

                                                <p className="mb-1">
                                                    Cylinder:{" "}
                                                    {visit.leftCylinder || "-"}
                                                </p>

                                                <p className="mb-1">
                                                    Axis:{" "}
                                                    {visit.leftAxis || "-"}
                                                </p>

                                                <p className="mb-0">
                                                    IOP:{" "}
                                                    {visit.leftIOP || "-"}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="col-12">

                                            <div className="border rounded p-3">

                                                <strong>
                                                    Doctor Notes
                                                </strong>

                                                <p className="mb-0 mt-2">
                                                    {visit.doctorNotes || "No notes"}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="col-md-6">

                                            <strong>
                                                Follow-up:
                                            </strong>{" "}
                                            {visit.followUpDate || "Not scheduled"}

                                        </div>

                                        <div className="col-md-6">

                                            <strong>
                                                Doctor:
                                            </strong>{" "}
                                            {visit.Doctor?.name || "-"}

                                        </div>

                                    </div>

                                </div>
                            ))
                        )}

                    </div>
                </div>

            </main>
        </div>
    );
};

export default DoctorPatientProfile;