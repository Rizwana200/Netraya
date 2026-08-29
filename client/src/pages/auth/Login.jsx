import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";


const Login = () => {

    const navigate = useNavigate();


    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await api.post(
                "/auth/login",
                {
                    phone,
                    password
                }
            );


            const data = response.data;


            // ==========================================
            // SAVE JWT
            // ==========================================

            localStorage.setItem(
                "netrayaToken",
                data.token
            );


            // ==========================================
            // SAVE USER
            // ==========================================

            localStorage.setItem(
                "netrayaUser",
                JSON.stringify(data.user)
            );


            // ==========================================
            // REDIRECT ACCORDING TO ROLE
            // ==========================================

            if (data.user.role === "PATIENT") {

                navigate("/patient");

            } else if (data.user.role === "DOCTOR") {

                navigate("/doctor");

            } else if (data.user.role === "STAFF") {

                navigate("/staff");

            } else if (data.user.role === "ADMIN") {

                navigate("/staff");

            } else {

                setError(
                    "Unknown user role"
                );

            }


        } catch (error) {

            setError(

                error.response?.data?.message ||
                "Login failed. Please check your phone number and password."

            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
        >

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-12 col-md-6 col-lg-4">

                        <div className="card border-0 shadow-lg">

                            <div className="card-body p-4 p-md-5">


                                {/* ======================================
                                    BRAND
                                ====================================== */}

                                <div className="text-center mb-4">

                                    <div
                                        className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                                        style={{
                                            width: "70px",
                                            height: "70px",
                                            backgroundColor: "#6f42c1",
                                            color: "white",
                                            fontSize: "28px",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        N
                                    </div>


                                    <h2
                                        className="fw-bold mb-1"
                                        style={{
                                            color: "#6f42c1"
                                        }}
                                    >
                                        Netraya
                                    </h2>


                                    <p className="text-muted mb-0">
                                        Eye Clinic Management System
                                    </p>

                                </div>


                                {/* ======================================
                                    BACK TO HOME
                                ====================================== */}

                                <div className="text-center mb-3">

                                    <Link
                                        to="/"
                                        className="text-decoration-none"
                                        style={{
                                            color: "#6f42c1",
                                            fontWeight: "500"
                                        }}
                                    >
                                        ← Back to Home
                                    </Link>

                                </div>


                                <h4 className="text-center fw-semibold mb-4">
                                    Login
                                </h4>


                                {/* ======================================
                                    ERROR
                                ====================================== */}

                                {error && (

                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {error}
                                    </div>

                                )}


                                {/* ======================================
                                    LOGIN FORM
                                ====================================== */}

                                <form onSubmit={handleSubmit}>


                                    {/* PHONE */}

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


                                    {/* PASSWORD */}

                                    <div className="mb-4">

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
                                            placeholder="Enter password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />

                                    </div>


                                    {/* LOGIN BUTTON */}

                                    <button
                                        type="submit"
                                        className="btn w-100 py-2 fw-semibold"
                                        style={{
                                            backgroundColor: "#6f42c1",
                                            color: "#ffffff"
                                        }}
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Logging in..."
                                            : "Login"
                                        }

                                    </button>

                                </form>


                                {/* ======================================
                                    REGISTER
                                ====================================== */}

                                <div className="text-center mt-4">

                                    <span className="text-muted">
                                        Don't have an account?
                                    </span>{" "}

                                    <button
                                        type="button"
                                        className="btn btn-link p-0 fw-semibold"
                                        style={{
                                            color: "#6f42c1",
                                            textDecoration: "none"
                                        }}
                                        onClick={() =>
                                            navigate("/register")
                                        }
                                    >
                                        Register
                                    </button>

                                </div>


                                {/* ======================================
                                    FOOTER
                                ====================================== */}

                                <div className="text-center mt-3">

                                    <small className="text-muted">
                                        Netraya Eye Clinic
                                    </small>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

};


export default Login;