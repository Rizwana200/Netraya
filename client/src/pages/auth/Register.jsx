import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("PATIENT");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");


        // Password validation

        if (password !== confirmPassword) {

            setError("Passwords do not match.");

            return;
        }


        setLoading(true);


        try {

            const response = await api.post(
                "/auth/register",
                {
                    name,
                    phone,
                    password,
                    role
                }
            );


            setSuccess(
                response.data?.message ||
                "Registration successful"
            );


            // Clear form

            setName("");
            setPhone("");
            setPassword("");
            setConfirmPassword("");
            setRole("PATIENT");


            // Go to login after short delay

            setTimeout(() => {

                navigate("/login");

            }, 1500);


        } catch (error) {

            console.error(
                "Registration error:",
                error
            );


            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                background:
                    "linear-gradient(135deg, #eefaff 0%, #f4efff 100%)"
            }}
        >

            <div className="container py-5">

                <div className="row justify-content-center">

                    <div className="col-12 col-md-7 col-lg-5">

                        <div
                            className="card border-0 shadow-lg"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <div className="card-body p-4 p-md-5">


                                {/* ==========================
                                    BRAND
                                ========================== */}

                                <div className="text-center mb-4">

                                    <div
                                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "65px",
                                            height: "65px",
                                            background:
                                                "linear-gradient(135deg, #00a8cc, #6f42c1)",
                                            color: "white",
                                            fontSize: "27px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        N
                                    </div>


                                    <h2
                                        className="fw-bold mb-1"
                                        style={{
                                            color: "#263b80"
                                        }}
                                    >
                                        Netraya
                                    </h2>


                                    <p className="text-muted mb-0">
                                        Eye Clinic Management System
                                    </p>

                                </div>


                                <h4 className="text-center fw-bold mb-4">
                                    Create Account
                                </h4>


                                {/* ==========================
                                    ERROR
                                ========================== */}

                                {error && (

                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {error}
                                    </div>

                                )}


                                {/* ==========================
                                    SUCCESS
                                ========================== */}

                                {success && (

                                    <div
                                        className="alert alert-success"
                                        role="alert"
                                    >
                                        {success}
                                    </div>

                                )}


                                <form onSubmit={handleSubmit}>


                                    {/* ==========================
                                        ROLE
                                    ========================== */}

                                    <div className="mb-3">

                                        <label
                                            className="form-label fw-semibold"
                                        >
                                            Register As
                                        </label>


                                        <select
                                            className="form-select"
                                            value={role}
                                            onChange={(e) =>
                                                setRole(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        >

                                            <option value="PATIENT">
                                                Patient
                                            </option>

                                            <option value="DOCTOR">
                                                Doctor
                                            </option>

                                            <option value="STAFF">
                                                Staff
                                            </option>

                                        </select>

                                    </div>


                                    {/* ==========================
                                        NAME
                                    ========================== */}

                                    <div className="mb-3">

                                        <label
                                            htmlFor="name"
                                            className="form-label fw-semibold"
                                        >
                                            Full Name
                                        </label>


                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            placeholder="Enter full name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* ==========================
                                        PHONE
                                    ========================== */}

                                    <div className="mb-3">

                                        <label
                                            htmlFor="phone"
                                            className="form-label fw-semibold"
                                        >
                                            Phone Number
                                        </label>


                                        <input
                                            type="tel"
                                            id="phone"
                                            className="form-control"
                                            placeholder="Enter phone number"
                                            value={phone}
                                            onChange={(e) =>
                                                setPhone(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* ==========================
                                        PASSWORD
                                    ========================== */}

                                    <div className="mb-3">

                                        <label
                                            htmlFor="password"
                                            className="form-label fw-semibold"
                                        >
                                            Password
                                        </label>


                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder="Create password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* ==========================
                                        CONFIRM PASSWORD
                                    ========================== */}

                                    <div className="mb-4">

                                        <label
                                            htmlFor="confirmPassword"
                                            className="form-label fw-semibold"
                                        >
                                            Confirm Password
                                        </label>


                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className="form-control"
                                            placeholder="Confirm password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* ==========================
                                        REGISTER BUTTON
                                    ========================== */}

                                    <button
                                        type="submit"
                                        className="btn w-100 py-2 fw-semibold text-white"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, #00a8cc, #6f42c1)",
                                            border: "none",
                                            borderRadius: "10px"
                                        }}
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Creating Account..."
                                            : "Create Account"
                                        }

                                    </button>

                                </form>


                                {/* ==========================
                                    LOGIN LINK
                                ========================== */}

                                <div className="text-center mt-4">

                                    <span className="text-muted">
                                        Already have an account?
                                    </span>{" "}

                                    <button
                                        type="button"
                                        className="btn btn-link p-0 fw-semibold"
                                        style={{
                                            color: "#6f42c1",
                                            textDecoration: "none"
                                        }}
                                        onClick={() =>
                                            navigate("/login")
                                        }
                                    >
                                        Login
                                    </button>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Register;