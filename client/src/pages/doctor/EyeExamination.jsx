import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

const EyeExamination = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        visitDate: new Date().toISOString().split("T")[0],

        rightVisualAcuity: "",
        rightSphere: "",
        rightCylinder: "",
        rightAxis: "",
        rightIOP: "",

        leftVisualAcuity: "",
        leftSphere: "",
        leftCylinder: "",
        leftAxis: "",
        leftIOP: "",

        diagnosis: "",
        doctorNotes: "",
        followUpDate: ""
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
                `/eye-visits/patient/${patientId}`,
                formData
            );

            setSuccess(
                response.data?.message ||
                "Eye examination saved successfully."
            );

            setTimeout(() => {
                navigate(`/doctor/patient/${patientId}`);
            }, 1000);

        } catch (error) {
            console.error(
                "Eye examination error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to save eye examination."
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
            {/* Navbar */}

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
                        Eye Examination
                    </span>
                </div>
            </nav>

            <main className="container py-4">

                <button
                    type="button"
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

                    <div className="card-body p-4 p-lg-5">

                        <div className="mb-4">
                            <h2 className="fw-bold mb-1">
                                Eye Examination
                            </h2>

                            <p className="text-muted mb-0">
                                Record the patient's eye examination.
                            </p>
                        </div>

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

                            {/* Visit details */}

                            <div className="mb-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    Visit Details
                                </h5>

                                <div className="col-md-4">

                                    <label className="form-label fw-semibold">
                                        Visit Date
                                    </label>

                                    <input
                                        type="date"
                                        name="visitDate"
                                        className="form-control"
                                        value={formData.visitDate}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>

                            {/* Right Eye */}

                            <div className="card border mb-4">

                                <div
                                    className="card-header fw-bold"
                                    style={{
                                        backgroundColor: "#f3effc",
                                        color: "#6f42c1"
                                    }}
                                >
                                    Right Eye (OD)
                                </div>

                                <div className="card-body">

                                    <div className="row g-3">

                                        <div className="col-md-4">

                                            <label className="form-label">
                                                Visual Acuity
                                            </label>

                                            <input
                                                type="text"
                                                name="rightVisualAcuity"
                                                className="form-control"
                                                placeholder="Example: 6/6"
                                                value={formData.rightVisualAcuity}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-2">

                                            <label className="form-label">
                                                Sphere
                                            </label>

                                            <input
                                                type="text"
                                                name="rightSphere"
                                                className="form-control"
                                                placeholder="-1.00"
                                                value={formData.rightSphere}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-2">

                                            <label className="form-label">
                                                Cylinder
                                            </label>

                                            <input
                                                type="text"
                                                name="rightCylinder"
                                                className="form-control"
                                                placeholder="-0.50"
                                                value={formData.rightCylinder}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-2">

                                            <label className="form-label">
                                                Axis
                                            </label>

                                            <input
                                                type="text"
                                                name="rightAxis"
                                                className="form-control"
                                                placeholder="90"
                                                value={formData.rightAxis}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-2">

                                            <label className="form-label">
                                                IOP
                                            </label>

                                            <input
                                                type="text"
                                                name="rightIOP"
                                                className="form-control"
                                                placeholder="15"
                                                value={formData.rightIOP}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Left Eye */}

                            <div className="card border mb-4">

                                <div
                                    className="card-header fw-bold"
                                    style={{
                                        backgroundColor: "#f3effc",
                                        color: "#6f42c1"
                                    }}
                                >
                                    Left Eye (OS)
                                </div>

                                <div className="card-body">

                                    <div className="row g-3">

                                        <div className="col-md-4">

                                            <label className="form-label">
                                                Visual Acuity
                                            </label>

                                            <input
                                                type="text"
                                                name="leftVisualAcuity"
                                                className="form-control"
                                                placeholder="Example: 6/9"
                                                value={formData.leftVisualAcuity}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-2">

                                            <label className="form-label">
                                                Sphere
                                            </label>

                                            <input
                                                type="text"
                                                name="leftSphere"
                                                className="form-control"
                                                placeholder="-1.25"
                                                value={formData.leftSphere}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-2">

                                            <label className="form-label">
                                                Cylinder
                                            </label>

                                            <input
                                                type="text"
                                                name="leftCylinder"
                                                className="form-control"
                                                placeholder="-0.25"
                                                value={formData.leftCylinder}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-2">

                                            <label className="form-label">
                                                Axis
                                            </label>

                                            <input
                                                type="text"
                                                name="leftAxis"
                                                className="form-control"
                                                placeholder="85"
                                                value={formData.leftAxis}
                                                onChange={handleChange}
                                            />

                                        </div>

                                        <div className="col-md-2">

                                            <label className="form-label">
                                                IOP
                                            </label>

                                            <input
                                                type="text"
                                                name="leftIOP"
                                                className="form-control"
                                                placeholder="16"
                                                value={formData.leftIOP}
                                                onChange={handleChange}
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Diagnosis */}

                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Diagnosis
                                </label>

                                <textarea
                                    name="diagnosis"
                                    className="form-control"
                                    rows="2"
                                    placeholder="Enter diagnosis"
                                    value={formData.diagnosis}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Doctor Notes */}

                            <div className="mb-3">

                                <label className="form-label fw-semibold">
                                    Doctor Notes
                                </label>

                                <textarea
                                    name="doctorNotes"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter clinical notes"
                                    value={formData.doctorNotes}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Follow-up */}

                            <div className="mb-4">

                                <label className="form-label fw-semibold">
                                    Follow-up Date
                                </label>

                                <input
                                    type="date"
                                    name="followUpDate"
                                    className="form-control"
                                    value={formData.followUpDate}
                                    onChange={handleChange}
                                />

                            </div>

                            {/* Submit */}

                            <div className="d-flex justify-content-end">

                                <button
                                    type="submit"
                                    className="btn btn-netraya px-4"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Saving..."
                                        : "Save Eye Examination"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            </main>
        </div>
    );
};

export default EyeExamination;