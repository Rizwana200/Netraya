import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Billing = () => {
    const navigate = useNavigate();

    const [phone, setPhone] = useState("");
    const [patient, setPatient] = useState(null);
    const [bills, setBills] = useState([]);

    const [formData, setFormData] = useState({
        billDate: new Date().toISOString().split("T")[0],
        checkupCost: "",
        spectaclesCost: "",
        spectaclesType: "",
        paidAmount: ""
    });

    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const searchPatient = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");
        setPatient(null);
        setBills([]);

        try {
            const response = await api.get(
                `/patient-search/phone/${phone.trim()}`
            );

            const foundPatient = response.data?.patient;

            if (!foundPatient) {
                throw new Error("Patient not found");
            }

            setPatient(foundPatient);

            const billsResponse = await api.get(
                `/billing/patient/${foundPatient.id}`
            );

            setBills(
                billsResponse.data?.bills || []
            );
        } catch (error) {
            console.error("Billing search error:", error);

            setError(
                error.response?.data?.message ||
                error.message ||
                "Unable to find patient"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const createBill = async (e) => {
        e.preventDefault();

        if (!patient) {
            setError("Search for a patient first.");
            return;
        }

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const response = await api.post(
                `/billing/patient/${patient.id}`,
                formData
            );

            setSuccess(
                response.data?.message ||
                "Bill created successfully"
            );

            const billsResponse = await api.get(
                `/billing/patient/${patient.id}`
            );

            setBills(
                billsResponse.data?.bills || []
            );

            setFormData({
                billDate: new Date().toISOString().split("T")[0],
                checkupCost: "",
                spectaclesCost: "",
                spectaclesType: "",
                paidAmount: ""
            });
        } catch (error) {
            console.error(
                "Create bill error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create bill"
            );
        } finally {
            setSaving(false);
        }
    };

    const updatePayment = async (billId) => {
        const paymentAmount = window.prompt(
            "Enter payment amount:"
        );

        if (!paymentAmount) {
            return;
        }

        try {
            setError("");
            setSuccess("");

            const response = await api.put(
                `/billing/${billId}/payment`,
                {
                    paymentAmount: Number(paymentAmount)
                }
            );

            setSuccess(
                response.data?.message ||
                "Payment updated successfully"
            );

            const billsResponse = await api.get(
                `/billing/patient/${patient.id}`
            );

            setBills(
                billsResponse.data?.bills || []
            );
        } catch (error) {
            console.error(
                "Payment update error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update payment"
            );
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
                        Billing
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

                <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body p-4">

                        <h2 className="fw-bold mb-1">
                            Patient Billing
                        </h2>

                        <p className="text-muted mb-4">
                            Search a patient and manage their eye-clinic billing.
                        </p>

                        <form onSubmit={searchPatient}>
                            <div className="row g-3 align-items-end">

                                <div className="col-md-9">
                                    <label className="form-label fw-semibold">
                                        Patient Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Enter patient phone number"
                                        value={phone}
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                        required
                                    />
                                </div>

                                <div className="col-md-3">
                                    <button
                                        type="submit"
                                        className="btn btn-netraya w-100"
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Searching..."
                                            : "Search Patient"}
                                    </button>
                                </div>

                            </div>
                        </form>

                        {error && (
                            <div className="alert alert-danger mt-4">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="alert alert-success mt-4">
                                {success}
                            </div>
                        )}

                    </div>
                </div>

                {patient && (
                    <>
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">

                                <h4 className="fw-bold">
                                    {patient.name}
                                </h4>

                                <p className="text-muted mb-0">
                                    Phone: {patient.phone}
                                </p>

                            </div>
                        </div>

                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-body p-4">

                                <h4 className="fw-bold mb-4">
                                    Create Bill
                                </h4>

                                <form onSubmit={createBill}>

                                    <div className="row g-3">

                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">
                                                Date
                                            </label>

                                            <input
                                                type="date"
                                                name="billDate"
                                                className="form-control"
                                                value={formData.billDate}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">
                                                Checkup Cost
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                name="checkupCost"
                                                className="form-control"
                                                placeholder="300"
                                                value={formData.checkupCost}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">
                                                Spectacles Cost
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                name="spectaclesCost"
                                                className="form-control"
                                                placeholder="1500"
                                                value={formData.spectaclesCost}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Spectacles Type
                                            </label>

                                            <select
                                                name="spectaclesType"
                                                className="form-select"
                                                value={formData.spectaclesType}
                                                onChange={handleChange}
                                            >
                                                <option value="">
                                                    Select type
                                                </option>

                                                <option value="Single Vision">
                                                    Single Vision
                                                </option>

                                                <option value="Bifocal">
                                                    Bifocal
                                                </option>

                                                <option value="Progressive">
                                                    Progressive
                                                </option>

                                                <option value="Photochromic">
                                                    Photochromic
                                                </option>

                                                <option value="Other">
                                                    Other
                                                </option>
                                            </select>
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">
                                                Paid Amount
                                            </label>

                                            <input
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                name="paidAmount"
                                                className="form-control"
                                                placeholder="1000"
                                                value={formData.paidAmount}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-end mt-4">

                                        <button
                                            type="submit"
                                            className="btn btn-netraya px-4"
                                            disabled={saving}
                                        >
                                            {saving
                                                ? "Creating..."
                                                : "Create Bill"}
                                        </button>

                                    </div>

                                </form>

                            </div>
                        </div>

                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-0">

                                <div className="p-4 border-bottom">
                                    <h4 className="fw-bold mb-1">
                                        Billing History
                                    </h4>

                                    <p className="text-muted mb-0">
                                        Patient's previous bills
                                    </p>
                                </div>

                                {bills.length === 0 ? (
                                    <div className="text-center py-5">
                                        <h5>
                                            No bills found
                                        </h5>
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

                                                    <th>
                                                        Action
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
                                                                {bill.status}
                                                            </span>
                                                        </td>

                                                        <td>
                                                            {bill.status === "DUE" && (
                                                                <button
                                                                    className="btn btn-sm btn-netraya"
                                                                    onClick={() =>
                                                                        updatePayment(
                                                                            bill.id
                                                                        )
                                                                    }
                                                                >
                                                                    Pay Due
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
                    </>
                )}

            </main>
        </div>
    );
};

export default Billing;