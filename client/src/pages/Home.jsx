import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    return (
        <div
            style={{
                minHeight: "100vh",
                background:
                    "linear-gradient(135deg, #f4fbff 0%, #eef7ff 45%, #f8f3ff 100%)",
                color: "#1f2937"
            }}
        >

            {/* ==============================
                NAVBAR
            ============================== */}

            <nav
                className="navbar navbar-expand-lg bg-white shadow-sm sticky-top"
            >
                <div className="container py-2">

                    <button
                        className="navbar-brand border-0 bg-transparent d-flex align-items-center"
                        onClick={() => navigate("/")}
                    >

                        <div
                            className="d-flex align-items-center justify-content-center rounded-circle me-2"
                            style={{
                                width: "42px",
                                height: "42px",
                                background:
                                    "linear-gradient(135deg, #00b4d8, #6f42c1)",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "21px"
                            }}
                        >
                            N
                        </div>

                        <span
                            className="fw-bold fs-4"
                            style={{
                                color: "#263b80"
                            }}
                        >
                            Netraya
                        </span>

                    </button>


                    <div className="d-flex align-items-center gap-2">

                        <button
                            className="btn btn-sm px-3"
                            style={{
                                color: "#263b80",
                                backgroundColor: "transparent"
                            }}
                            onClick={() =>
                                document
                                    .getElementById("services")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            Services
                        </button>


                        <button
                            className="btn btn-sm px-3"
                            style={{
                                color: "#263b80",
                                backgroundColor: "transparent"
                            }}
                            onClick={() =>
                                document
                                    .getElementById("about")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            About
                        </button>


                        <button
                            className="btn btn-sm px-3"
                            style={{
                                color: "#263b80",
                                backgroundColor: "transparent"
                            }}
                            onClick={() =>
                                navigate("/login")
                            }
                        >
                            Login
                        </button>


                        <button
                            className="btn btn-sm px-3 text-white"
                            style={{
                                background:
                                    "linear-gradient(135deg, #00a8cc, #6f42c1)",
                                border: "none",
                                borderRadius: "20px"
                            }}
                            onClick={() =>
                                navigate("/register")
                            }
                        >
                            Register
                        </button>

                    </div>

                </div>
            </nav>


            {/* ==============================
                HERO SECTION
            ============================== */}

            <section className="container py-5">

                <div className="row align-items-center g-5 py-lg-5">


                    {/* LEFT */}

                    <div className="col-lg-6">

                        <div
                            className="d-inline-flex align-items-center px-3 py-2 rounded-pill mb-3"
                            style={{
                                backgroundColor: "#e0f7ff",
                                color: "#0087a8",
                                fontWeight: "600"
                            }}
                        >
                            👁️ Trusted Eye Care
                        </div>


                        <h1
                            className="display-4 fw-bold"
                            style={{
                                color: "#263b80",
                                lineHeight: "1.15"
                            }}
                        >
                            Your Vision.
                            <br />

                            <span
                                style={{
                                    background:
                                        "linear-gradient(90deg, #00a8cc, #6f42c1)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent"
                                }}
                            >
                                Our Care.
                            </span>
                        </h1>


                        <p
                            className="lead mt-4"
                            style={{
                                color: "#5f6b7a",
                                maxWidth: "580px"
                            }}
                        >
                            Welcome to Netraya, your complete eye clinic
                            management platform. Connect with trusted eye
                            care professionals and manage your appointments,
                            eye history, prescriptions and clinic services
                            in one place.
                        </p>


                        <div className="d-flex flex-wrap gap-3 mt-4">

                            <button
                                className="btn btn-lg px-4 text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #00a8cc, #6f42c1)",
                                    border: "none",
                                    borderRadius: "30px"
                                }}
                                onClick={() =>
                                    navigate("/register")
                                }
                            >
                                Get Started →
                            </button>


                            <button
                                className="btn btn-lg px-4"
                                style={{
                                    backgroundColor: "white",
                                    color: "#263b80",
                                    border: "1px solid #d8e3f0",
                                    borderRadius: "30px"
                                }}
                                onClick={() =>
                                    document
                                        .getElementById("services")
                                        ?.scrollIntoView({
                                            behavior: "smooth"
                                        })
                                }
                            >
                                Explore Services
                            </button>

                        </div>


                        {/* SMALL STATS */}

                        <div className="row mt-5 g-3">

                            <div className="col-4">

                                <h4
                                    className="fw-bold mb-0"
                                    style={{
                                        color: "#00a0c6"
                                    }}
                                >
                                    24/7
                                </h4>

                                <small className="text-muted">
                                    Access
                                </small>

                            </div>


                            <div className="col-4">

                                <h4
                                    className="fw-bold mb-0"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    Expert
                                </h4>

                                <small className="text-muted">
                                    Eye Care
                                </small>

                            </div>


                            <div className="col-4">

                                <h4
                                    className="fw-bold mb-0"
                                    style={{
                                        color: "#00a0c6"
                                    }}
                                >
                                    Secure
                                </h4>

                                <small className="text-muted">
                                    Records
                                </small>

                            </div>

                        </div>

                    </div>


                    {/* RIGHT IMAGE */}

                    <div className="col-lg-6">

                        <div
                            className="position-relative"
                            style={{
                                padding: "15px"
                            }}
                        >

                            <div
                                style={{
                                    position: "absolute",
                                    width: "180px",
                                    height: "180px",
                                    backgroundColor: "#bdefff",
                                    borderRadius: "50%",
                                    top: "-30px",
                                    right: "-20px",
                                    opacity: 0.7
                                }}
                            />

                            <div
                                className="position-relative shadow-lg overflow-hidden"
                                style={{
                                    borderRadius: "30px",
                                    border: "8px solid white"
                                }}
                            >

                                <img
                                    src="/eye2.webp"
                                    alt="Eye examination at Netraya"
                                    className="img-fluid w-100"
                                    style={{
                                        minHeight: "380px",
                                        objectFit: "cover"
                                    }}
                                />

                            </div>


                            <div
                                className="position-absolute bg-white shadow p-3 rounded-4"
                                style={{
                                    left: "-5px",
                                    bottom: "25px"
                                }}
                            >

                                <div className="d-flex align-items-center">

                                    <div
                                        className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "#e4f9ff"
                                        }}
                                    >
                                        👁️
                                    </div>

                                    <div>

                                        <strong>
                                            Better Vision
                                        </strong>

                                        <br />

                                        <small className="text-muted">
                                            Better Life
                                        </small>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==============================
                FEATURES
            ============================== */}

            <section
                id="about"
                className="container py-5"
            >

                <div className="text-center mb-5">

                    <span
                        className="fw-semibold"
                        style={{
                            color: "#00a0c6"
                        }}
                    >
                        WHY NETRAYA?
                    </span>

                    <h2
                        className="fw-bold mt-2"
                        style={{
                            color: "#263b80"
                        }}
                    >
                        Complete Eye Care in One Place
                    </h2>

                    <p className="text-muted">
                        Everything you need to manage your eye care journey.
                    </p>

                </div>


                <div className="row g-4">


                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <div className="card-body p-4">

                                <div
                                    className="rounded-4 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "#e0f7ff",
                                        fontSize: "28px"
                                    }}
                                >
                                    👨‍⚕️
                                </div>

                                <h5
                                    className="fw-bold"
                                    style={{
                                        color: "#263b80"
                                    }}
                                >
                                    Trusted Eye Doctors
                                </h5>

                                <p className="text-muted mb-0">
                                    Connect with qualified eye care
                                    professionals and explore their
                                    expertise and experience.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <div className="card-body p-4">

                                <div
                                    className="rounded-4 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "#f0e8ff",
                                        fontSize: "28px"
                                    }}
                                >
                                    📋
                                </div>

                                <h5
                                    className="fw-bold"
                                    style={{
                                        color: "#263b80"
                                    }}
                                >
                                    Digital Eye Records
                                </h5>

                                <p className="text-muted mb-0">
                                    Keep your examinations, diagnoses,
                                    prescriptions and medical documents
                                    organized.
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4">

                        <div
                            className="card border-0 shadow-sm h-100"
                            style={{
                                borderRadius: "20px"
                            }}
                        >

                            <div className="card-body p-4">

                                <div
                                    className="rounded-4 d-flex align-items-center justify-content-center mb-4"
                                    style={{
                                        width: "60px",
                                        height: "60px",
                                        backgroundColor: "#e8f8ed",
                                        fontSize: "28px"
                                    }}
                                >
                                    🔒
                                </div>

                                <h5
                                    className="fw-bold"
                                    style={{
                                        color: "#263b80"
                                    }}
                                >
                                    Secure & Simple
                                </h5>

                                <p className="text-muted mb-0">
                                    A simple clinic platform designed to
                                    make managing your eye care convenient
                                    and secure.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==============================
                SERVICES
            ============================== */}

            <section
                id="services"
                className="py-5"
                style={{
                    backgroundColor: "#ffffff"
                }}
            >

                <div className="container py-4">

                    <div className="text-center mb-5">

                        <span
                            className="fw-semibold"
                            style={{
                                color: "#6f42c1"
                            }}
                        >
                            OUR SERVICES
                        </span>

                        <h2
                            className="fw-bold mt-2"
                            style={{
                                color: "#263b80"
                            }}
                        >
                            Eye Care Services
                        </h2>

                        <p className="text-muted">
                            Supporting your vision at every stage.
                        </p>

                    </div>


                    <div className="row g-4">


                        <div className="col-6 col-lg-3">

                            <div
                                className="text-center p-4 h-100 rounded-4"
                                style={{
                                    backgroundColor: "#eafaff"
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "38px"
                                    }}
                                >
                                    👁️
                                </div>

                                <h6
                                    className="fw-bold mt-3"
                                    style={{
                                        color: "#263b80"
                                    }}
                                >
                                    Eye Examination
                                </h6>

                                <p className="small text-muted mb-0">
                                    Comprehensive vision checks.
                                </p>

                            </div>

                        </div>


                        <div className="col-6 col-lg-3">

                            <div
                                className="text-center p-4 h-100 rounded-4"
                                style={{
                                    backgroundColor: "#f3edff"
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "38px"
                                    }}
                                >
                                    🔍
                                </div>

                                <h6
                                    className="fw-bold mt-3"
                                    style={{
                                        color: "#263b80"
                                    }}
                                >
                                    Cataract Care
                                </h6>

                                <p className="small text-muted mb-0">
                                    Diagnosis and treatment support.
                                </p>

                            </div>

                        </div>


                        <div className="col-6 col-lg-3">

                            <div
                                className="text-center p-4 h-100 rounded-4"
                                style={{
                                    backgroundColor: "#eaf8ef"
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "38px"
                                    }}
                                >
                                    🩺
                                </div>

                                <h6
                                    className="fw-bold mt-3"
                                    style={{
                                        color: "#263b80"
                                    }}
                                >
                                    Retina Care
                                </h6>

                                <p className="small text-muted mb-0">
                                    Retina examination and monitoring.
                                </p>

                            </div>

                        </div>


                        <div className="col-6 col-lg-3">

                            <div
                                className="text-center p-4 h-100 rounded-4"
                                style={{
                                    backgroundColor: "#fff5df"
                                }}
                            >

                                <div
                                    style={{
                                        fontSize: "38px"
                                    }}
                                >
                                    💙
                                </div>

                                <h6
                                    className="fw-bold mt-3"
                                    style={{
                                        color: "#263b80"
                                    }}
                                >
                                    Glaucoma Care
                                </h6>

                                <p className="small text-muted mb-0">
                                    Monitoring and eye health management.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* ==============================
                CALL TO ACTION
            ============================== */}

            <section className="container py-5">

                <div
                    className="p-5 text-center text-white shadow"
                    style={{
                        borderRadius: "30px",
                        background:
                            "linear-gradient(135deg, #00a8cc, #6f42c1)"
                    }}
                >

                    <h2 className="fw-bold">
                        Take the First Step Towards Better Vision
                    </h2>

                    <p className="mb-4 opacity-75">
                        Create your Netraya account and start managing
                        your eye care journey.
                    </p>

                    <button
                        className="btn btn-light px-4 py-2 fw-semibold"
                        style={{
                            borderRadius: "25px",
                            color: "#263b80"
                        }}
                        onClick={() =>
                            navigate("/register")
                        }
                    >
                        Create Your Account
                    </button>

                </div>

            </section>


            {/* ==============================
                FOOTER
            ============================== */}

            <footer
                className="text-white py-4"
                style={{
                    backgroundColor: "#263b80"
                }}
            >

                <div className="container">

                    <div className="row align-items-center">

                        <div className="col-md-6">

                            <div className="d-flex align-items-center">

                                <div
                                    className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                    style={{
                                        width: "38px",
                                        height: "38px",
                                        backgroundColor: "#00a8cc",
                                        fontWeight: "bold"
                                    }}
                                >
                                    N
                                </div>

                                <strong className="fs-5">
                                    Netraya Eye Clinic
                                </strong>

                            </div>

                        </div>


                        <div className="col-md-6 text-md-end mt-3 mt-md-0">

                            <small className="opacity-75">
                                Your Vision. Our Care.
                            </small>

                        </div>

                    </div>

                </div>

            </footer>

        </div>
    );
};

export default Home;