import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import LogoutButton from "../../components/LogoutButton";

const DoctorDashboard = () => {
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingToken, setUpdatingToken] = useState(null);

    useEffect(() => {

        const fetchPatients = async () => {

            try {

                const response =
                    await api.get("/doctor/today");

                setPatients(
                    response.data?.patients || []
                );

            } catch (error) {

                console.error(
                    "Doctor dashboard error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load today's patients"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchPatients();

    }, []);


    // ==========================================
    // COMPLETE PATIENT TOKEN
    // ==========================================

    const completeToken = async (tokenId) => {

        try {

            setUpdatingToken(tokenId);

            await api.put(
                `/doctor/token/${tokenId}/status`,
                {
                    status: "COMPLETED"
                }
            );


            // Update the screen immediately
            setPatients((previousPatients) =>
                previousPatients.map(
                    (patient) =>
                        patient.tokenId === tokenId
                            ? {
                                ...patient,
                                status: "COMPLETED"
                            }
                            : patient
                )
            );

        } catch (error) {

            console.error(
                "Complete token error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to complete patient token"
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


    const waitingCount =
        patients.filter(
            (patient) =>
                patient.status === "WAITING"
        ).length;


    const withDoctorCount =
        patients.filter(
            (patient) =>
                patient.status === "WITH_DOCTOR"
        ).length;


    const completedCount =
        patients.filter(
            (patient) =>
                patient.status === "COMPLETED"
        ).length;


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

            {/* ======================================
                NAVBAR
            ====================================== */}

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
                                    "/doctor/profile"
                                )
                            }
                        >
                            My Profile
                        </button>


                        <button
                            type="button"
                            className="btn btn-sm"
                            style={headerButtonStyle}
                            onClick={() =>
                                navigate(
                                    "/doctor/search"
                                )
                            }
                        >
                            Search Patient
                        </button>


                        <LogoutButton />

                    </div>

                </div>

            </nav>


            {/* ======================================
                MAIN
            ====================================== */}

            <main className="container py-4">

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Doctor Dashboard
                    </h2>

                    <p className="text-muted">
                        Today's eye-clinic patients
                    </p>

                </div>


                {/* ======================================
                    SUMMARY
                ====================================== */}

                <div className="row g-3 mb-4">

                    <div className="col-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    Total Patients
                                </small>

                                <h3
                                    className="fw-bold mt-2"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    {patients.length}
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
                                    {waitingCount}
                                </h3>

                            </div>

                        </div>

                    </div>


                    <div className="col-6 col-lg-3">

                        <div className="card border-0 shadow-sm h-100">

                            <div className="card-body">

                                <small className="text-muted">
                                    With Doctor
                                </small>

                                <h3 className="fw-bold mt-2">
                                    {withDoctorCount}
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
                                    {completedCount}
                                </h3>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    PATIENT TABLE
                ====================================== */}

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4">

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <div>

                                <h4 className="fw-bold mb-1">
                                    Today's Patients
                                </h4>

                                <p className="text-muted mb-0">
                                    Select a patient to view their eye history.
                                </p>

                            </div>


                            <button
                                type="button"
                                className="btn btn-netraya"
                                onClick={() =>
                                    navigate(
                                        "/doctor/search"
                                    )
                                }
                            >
                                Search Patient
                            </button>

                        </div>


                        {patients.length === 0 ? (

                            <div className="text-center py-5">

                                <h5>
                                    No patients today
                                </h5>

                                <p className="text-muted mb-0">
                                    Today's patient queue is empty.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle">

                                    <thead
                                        style={{
                                            backgroundColor:
                                                "#f3effc"
                                        }}
                                    >

                                        <tr>

                                            <th>
                                                Token
                                            </th>

                                            <th>
                                                Patient
                                            </th>

                                            <th>
                                                Phone
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

                                        {patients.map(
                                            (patient) => (

                                                <tr
                                                    key={
                                                        patient.tokenId
                                                    }
                                                >

                                                    <td className="fw-bold">
                                                        #
                                                        {patient.tokenNumber}
                                                    </td>


                                                    <td>
                                                        {patient.patient?.name ||
                                                            "-"}
                                                    </td>


                                                    <td>
                                                        {patient.patient?.phone ||
                                                            "-"}
                                                    </td>


                                                    <td>

                                                        <span
                                                            className="badge"
                                                            style={{
                                                                backgroundColor:
                                                                    patient.status ===
                                                                    "COMPLETED"
                                                                        ? "#198754"
                                                                        : patient.status ===
                                                                            "WITH_DOCTOR"
                                                                                ? "#6f42c1"
                                                                                : patient.status ===
                                                                                    "NO_SHOW"
                                                                                    ? "#dc3545"
                                                                                    : "#ffc107",

                                                                color:
                                                                    patient.status ===
                                                                    "WAITING"
                                                                        ? "#212529"
                                                                        : "#ffffff"
                                                            }}
                                                        >
                                                            {patient.status}
                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div className="d-flex gap-2">

                                                            <button
                                                                type="button"
                                                                className="btn btn-sm btn-netraya"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/doctor/patient/${patient.patient?.id}`
                                                                    )
                                                                }
                                                            >
                                                                View Patient
                                                            </button>


                                                            {patient.status ===
                                                                "WITH_DOCTOR" && (

                                                                <button
                                                                    type="button"
                                                                    className="btn btn-sm btn-success"
                                                                    disabled={
                                                                        updatingToken ===
                                                                        patient.tokenId
                                                                    }
                                                                    onClick={() =>
                                                                        completeToken(
                                                                            patient.tokenId
                                                                        )
                                                                    }
                                                                >
                                                                    {updatingToken ===
                                                                    patient.tokenId
                                                                        ? "Completing..."
                                                                        : "Complete"}
                                                                </button>

                                                            )}

                                                        </div>

                                                    </td>

                                                </tr>

                                            )
                                        )}

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

export default DoctorDashboard;