import { useEffect, useState } from "react";
import api from "../../services/api";

const Bills = () => {
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBills = async () => {
            try {
                // Get the logged-in patient's actual patient ID
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

                // Get this patient's bills
                const response = await api.get(
                    `/billing/patient/${patientId}`
                );

                setBills(
                    response.data?.bills || []
                );

            } catch (error) {
                console.error(
                    "Bills error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Unable to load bills"
                );

            } finally {
                setLoading(false);
            }
        };

        fetchBills();
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
                        Billing
                    </span>
                </div>
            </nav>

            <main className="container py-4">

                <h2 className="fw-bold mb-1">
                    My Bills
                </h2>

                <p className="text-muted mb-4">
                    Checkup and spectacles billing history
                </p>

                {error && (
                    <div className="alert alert-danger">
                        {error}
                    </div>
                )}

                {!error && bills.length === 0 && (
                    <div className="card border-0 shadow-sm">
                        <div className="card-body text-center p-5">

                            <h5>
                                No bills found
                            </h5>

                            <p className="text-muted mb-0">
                                Your billing information will appear here.
                            </p>

                        </div>
                    </div>
                )}

                {bills.length > 0 && (
                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-0">

                            <div className="table-responsive">

                                <table className="table table-hover mb-0">

                                    <thead
                                        style={{
                                            backgroundColor: "#f3effc"
                                        }}
                                    >
                                        <tr>
                                            <th className="px-4">
                                                Date
                                            </th>

                                            <th>
                                                Checkup Cost
                                            </th>

                                            <th>
                                                Spectacles Cost
                                            </th>

                                            <th>
                                                Spectacles Type
                                            </th>

                                            <th>
                                                Total Cost
                                            </th>

                                            <th>
                                                Due
                                            </th>

                                            <th>
                                                Status
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {bills.map((bill) => (
                                            <tr key={bill.id}>

                                                <td className="px-4">
                                                    {bill.billDate
                                                        ? new Date(
                                                            bill.billDate
                                                        ).toLocaleDateString()
                                                        : "-"}
                                                </td>

                                                <td>
                                                    ₹{bill.checkupCost ?? 0}
                                                </td>

                                                <td>
                                                    ₹{bill.spectaclesCost ?? 0}
                                                </td>

                                                <td>
                                                    {bill.spectaclesType || "-"}
                                                </td>

                                                <td className="fw-bold">
                                                    ₹{bill.totalCost ?? 0}
                                                </td>

                                                <td>
                                                    ₹{bill.dueAmount ?? 0}
                                                </td>

                                                <td>
                                                    <span
                                                        className="badge"
                                                        style={{
                                                            backgroundColor:
                                                                bill.status === "COMPLETED"
                                                                    ? "#198754"
                                                                    : "#ffc107",
                                                            color:
                                                                bill.status === "COMPLETED"
                                                                    ? "#ffffff"
                                                                    : "#212529"
                                                        }}
                                                    >
                                                        {bill.status || "DUE"}
                                                    </span>
                                                </td>

                                            </tr>
                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};

export default Bills;