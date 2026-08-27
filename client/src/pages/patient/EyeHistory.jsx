import { useEffect, useState } from "react";
import api from "../../services/api";

const EyeHistory = () => {

    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const user = JSON.parse(
    localStorage.getItem("netrayaUser")
);

const response = await api.get(
    `/eye-visits/patient/${user.id}/history`
);

                const data = response.data;

                setVisits(
                    data.visits ||
                    data.eyeVisits ||
                    []
                );

            } catch (error) {

                console.error(
                    "Eye history error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load eye history"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchHistory();

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
                className="navbar navbar-dark"
                style={{
                    backgroundColor: "#6f42c1"
                }}
            >

                <div className="container">

                    <span className="navbar-brand fw-bold">
                        Netraya
                    </span>

                    <span className="text-white">
                        Eye History
                    </span>

                </div>

            </nav>


            <main className="container py-4">

                <h2 className="fw-bold mb-1">
                    Eye Examination History
                </h2>

                <p className="text-muted mb-4">
                    Your previous eye examinations
                </p>


                {error && (

                    <div className="alert alert-danger">
                        {error}
                    </div>

                )}


                {!error && visits.length === 0 && (

                    <div className="card border-0 shadow-sm">

                        <div className="card-body text-center p-5">

                            <h5>
                                No eye examinations found
                            </h5>

                            <p className="text-muted mb-0">
                                Your examination history will appear here.
                            </p>

                        </div>

                    </div>

                )}


                {visits.map((visit) => (

                    <div
                        className="card border-0 shadow-sm mb-4"
                        key={visit.id}
                    >

                        <div className="card-body p-4">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <div>

                                    <h5 className="fw-bold mb-1">
                                        Eye Examination
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

                                    <div className="border rounded p-3">

                                        <h6
                                            className="fw-bold"
                                            style={{
                                                color: "#6f42c1"
                                            }}
                                        >
                                            Right Eye
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

                                    <div className="border rounded p-3">

                                        <h6
                                            className="fw-bold"
                                            style={{
                                                color: "#6f42c1"
                                            }}
                                        >
                                            Left Eye
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

                                    <div className="bg-light rounded p-3">

                                        <strong>
                                            Doctor Notes
                                        </strong>

                                        <p className="mb-0 mt-2">
                                            {visit.doctorNotes || "No notes"}
                                        </p>

                                    </div>

                                </div>


                                <div className="col-12">

                                    <strong>
                                        Follow-up Date:
                                    </strong>{" "}

                                    {visit.followUpDate || "Not scheduled"}

                                </div>

                            </div>

                        </div>

                    </div>

                ))}

            </main>

        </div>

    );

};

export default EyeHistory;