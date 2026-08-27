import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const RegisterPatient = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        address: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response = await api.post(
                "/patients/register",
                formData
            );

            setSuccess(
                response.data?.message ||
                "Patient registered successfully."
            );

            setFormData({
                name: "",
                phone: "",
                password: "",
                dateOfBirth: "",
                gender: "",
                address: ""
            });

        } catch (error) {
            console.error(
                "Patient registration error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to register patient."
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
                        Register Patient
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

                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4 p-lg-5">

                        <h2 className="fw-bold mb-1">
                            Register New Patient
                        </h2>

                        <p className="text-muted mb-4">
                            Create an account for a new eye-clinic patient.
                        </p>

                        {success && (
                            <div className="alert alert-success">
                                {success}
                            </div>
                        )}

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label
                                        htmlFor="name"
                                        className="form-label fw-semibold"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="Enter patient name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label
                                        htmlFor="phone"
                                        className="form-label fw-semibold"
                                    >
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        className="form-control"
                                        placeholder="Enter phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label
                                        htmlFor="password"
                                        className="form-label fw-semibold"
                                    >
                                        Temporary Password
                                    </label>

                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Set patient password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label
                                        htmlFor="dateOfBirth"
                                        className="form-label fw-semibold"
                                    >
                                        Date of Birth
                                    </label>

                                    <input
                                        type="date"
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        className="form-control"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label
                                        htmlFor="gender"
                                        className="form-label fw-semibold"
                                    >
                                        Gender
                                    </label>

                                    <select
                                        id="gender"
                                        name="gender"
                                        className="form-select"
                                        value={formData.gender}
                                        onChange={handleChange}
                                    >
                                        <option value="">
                                            Select gender
                                        </option>

                                        <option value="MALE">
                                            Male
                                        </option>

                                        <option value="FEMALE">
                                            Female
                                        </option>

                                        <option value="OTHER">
                                            Other
                                        </option>
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label
                                        htmlFor="address"
                                        className="form-label fw-semibold"
                                    >
                                        Address
                                    </label>

                                    <textarea
                                        id="address"
                                        name="address"
                                        className="form-control"
                                        rows="3"
                                        placeholder="Enter patient address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => navigate("/staff")}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="btn btn-netraya px-4"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Registering..."
                                        : "Register Patient"}
                                </button>

                            </div>

                        </form>

                    </div>
                </div>

            </main>
        </div>
    );
};

export default RegisterPatient;