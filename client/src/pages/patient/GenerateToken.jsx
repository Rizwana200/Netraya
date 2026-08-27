import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const GenerateToken = () => {

    const navigate = useNavigate();

    const [token, setToken] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const handleGenerateToken = async () => {

        setLoading(true);

        setError("");

        setSuccess("");

        setToken(null);


        try {

            const response = await api.post(
                "/tokens/generate",
                {
                    source: "WEBSITE"
                }
            );


            setToken(
                response.data?.token || null
            );


            setSuccess(
                response.data?.message ||
                "Token generated successfully."
            );


        } catch (error) {

            console.error(
                "Patient token error:",
                error
            );


            // Already has today's token

            if (
                error.response?.status === 409 &&
                error.response?.data?.token
            ) {

                setToken(
                    error.response.data.token
                );

                setError(
                    error.response.data.message
                );

            } else {

                setError(
                    error.response?.data?.message ||
                    "Unable to generate token."
                );

            }

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

            {/* NAVBAR */}

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
                        Generate Token
                    </span>

                </div>

            </nav>


            <main className="container py-4">

                <button
                    type="button"
                    className="btn btn-outline-secondary mb-4"
                    onClick={() =>
                        navigate("/patient")
                    }
                >
                    ← Back to Dashboard
                </button>


                <div className="row justify-content-center">

                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body p-4 p-lg-5 text-center">

                                <h2 className="fw-bold mb-2">
                                    Get Today's Token
                                </h2>

                                <p className="text-muted mb-4">
                                    You can generate one token for today's
                                    eye-clinic visit.
                                </p>


                                {error && (

                                    <div className="alert alert-warning text-start">

                                        {error}

                                    </div>

                                )}


                                {success && (

                                    <div className="alert alert-success text-start">

                                        {success}

                                    </div>

                                )}


                                {!token && (

                                    <button
                                        type="button"
                                        className="btn btn-netraya btn-lg px-5"
                                        onClick={
                                            handleGenerateToken
                                        }
                                        disabled={loading}
                                    >
                                        {loading
                                            ? "Generating..."
                                            : "Generate My Token"}
                                    </button>

                                )}


                                {token && (

                                    <div
                                        className="card border-0 mt-4"
                                        style={{
                                            backgroundColor:
                                                "#f3effc"
                                        }}
                                    >

                                        <div className="card-body p-4">

                                            <p className="text-muted mb-2">
                                                Your Today's Token
                                            </p>


                                            <h1
                                                className="display-2 fw-bold"
                                                style={{
                                                    color:
                                                        "#6f42c1"
                                                }}
                                            >
                                                #{token.tokenNumber}
                                            </h1>


                                            <p className="mb-2">
                                                Date:{" "}
                                                {token.tokenDate ||
                                                    "-"}
                                            </p>


                                            <p className="mb-3">
                                                Status:{" "}
                                                <span
                                                    className="badge"
                                                    style={{
                                                        backgroundColor:
                                                            "#6f42c1",
                                                        color:
                                                            "#ffffff"
                                                    }}
                                                >
                                                    {token.status ||
                                                        "WAITING"}
                                                </span>
                                            </p>


                                            <p className="text-muted mb-0">
                                                You can only have one
                                                token for today.
                                            </p>

                                        </div>

                                    </div>

                                )}


                                {token && (

                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary mt-4"
                                        onClick={() =>
                                            navigate(
                                                "/patient"
                                            )
                                        }
                                    >
                                        Back to Dashboard
                                    </button>

                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </div>

    );

};


export default GenerateToken;