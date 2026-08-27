import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const EditProfile = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        qualification: "",
        specialization: "",
        experienceYears: "",
        expertise: "",
        medicalRegistrationNumber: "",
        languages: "",
        department: "",
        bio: "",
        profilePhoto: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const response = await api.get(
                    "/doctor-profile/me/profile"
                );

                const doctor =
                    response.data?.doctor;

                if (doctor) {

                    setFormData({
                        name: doctor.name || "",
                        qualification:
                            doctor.qualification || "",
                        specialization:
                            doctor.specialization || "",
                        experienceYears:
                            doctor.experienceYears ?? "",
                        expertise:
                            doctor.expertise || "",
                        medicalRegistrationNumber:
                            doctor.medicalRegistrationNumber || "",
                        languages:
                            doctor.languages || "",
                        department:
                            doctor.department || "",
                        bio:
                            doctor.bio || "",
                        profilePhoto:
                            doctor.profilePhoto || ""
                    });

                }

            } catch (error) {

                console.error(
                    "Doctor profile error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Unable to load your profile"
                );

            } finally {

                setLoading(false);

            }

        };

        fetchProfile();

    }, []);


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {

            const response = await api.put(
                "/doctor-profile/me/profile",
                formData
            );

            setSuccess(
                response.data?.message ||
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(
                "Update doctor profile error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update profile"
            );

        } finally {

            setSaving(false);

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
                        Edit Professional Profile
                    </span>

                </div>

            </nav>


            <main className="container py-4">

                <button
                    type="button"
                    className="btn btn-outline-secondary mb-4"
                    onClick={() =>
                        navigate("/doctor/profile")
                    }
                >
                    ← Back to Profile
                </button>


                <div className="card border-0 shadow-sm">

                    <div className="card-body p-4 p-lg-5">

                        <div className="mb-4">

                            <h2 className="fw-bold mb-1">
                                Professional Profile
                            </h2>

                            <p className="text-muted mb-0">
                                Add your qualifications and professional
                                information so patients and staff can verify
                                your profile.
                            </p>

                        </div>


                        {error && (

                            <div className="alert alert-danger">
                                {error}
                            </div>

                        )}


                        {success && (

                            <div className="alert alert-success">
                                {success}
                            </div>

                        )}


                        <form onSubmit={handleSubmit}>

                            {/* BASIC DETAILS */}

                            <div className="mb-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    Basic Information
                                </h5>

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            Department
                                        </label>

                                        <input
                                            type="text"
                                            name="department"
                                            className="form-control"
                                            placeholder="Ophthalmology"
                                            value={formData.department}
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* PROFESSIONAL DETAILS */}

                            <div className="mb-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    Professional Details
                                </h5>

                                <div className="row g-3">

                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            Qualification
                                        </label>

                                        <input
                                            type="text"
                                            name="qualification"
                                            className="form-control"
                                            placeholder="Example: MBBS, MS Ophthalmology"
                                            value={formData.qualification}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="col-md-6">

                                        <label className="form-label fw-semibold">
                                            Specialization
                                        </label>

                                        <input
                                            type="text"
                                            name="specialization"
                                            className="form-control"
                                            placeholder="Example: Ophthalmology"
                                            value={formData.specialization}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="col-md-4">

                                        <label className="form-label fw-semibold">
                                            Years of Experience
                                        </label>

                                        <input
                                            type="number"
                                            name="experienceYears"
                                            className="form-control"
                                            min="0"
                                            value={formData.experienceYears}
                                            onChange={handleChange}
                                        />

                                    </div>


                                    <div className="col-md-8">

                                        <label className="form-label fw-semibold">
                                            Medical Registration Number
                                        </label>

                                        <input
                                            type="text"
                                            name="medicalRegistrationNumber"
                                            className="form-control"
                                            placeholder="Professional registration number"
                                            value={
                                                formData.medicalRegistrationNumber
                                            }
                                            onChange={handleChange}
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* EXPERTISE */}

                            <div className="mb-4">

                                <h5
                                    className="fw-bold mb-3"
                                    style={{
                                        color: "#6f42c1"
                                    }}
                                >
                                    Expertise
                                </h5>

                                <textarea
                                    name="expertise"
                                    className="form-control"
                                    rows="4"
                                    placeholder="Example: Cataract surgery, glaucoma management, retina screening, refractive errors"
                                    value={formData.expertise}
                                    onChange={handleChange}
                                />

                                <small className="text-muted">
                                    List the areas in which you have professional expertise.
                                </small>

                            </div>


                            {/* LANGUAGES */}

                            <div className="mb-4">

                                <label className="form-label fw-semibold">
                                    Languages Spoken
                                </label>

                                <input
                                    type="text"
                                    name="languages"
                                    className="form-control"
                                    placeholder="Example: English, Telugu, Hindi"
                                    value={formData.languages}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* BIO */}

                            <div className="mb-4">

                                <label className="form-label fw-semibold">
                                    About Doctor
                                </label>

                                <textarea
                                    name="bio"
                                    className="form-control"
                                    rows="5"
                                    placeholder="Write a professional introduction about your experience and areas of practice."
                                    value={formData.bio}
                                    onChange={handleChange}
                                />

                            </div>


                            {/* PROFILE PHOTO */}

                            <div className="mb-4">

                                <label className="form-label fw-semibold">
                                    Profile Photo URL
                                </label>

                                <input
                                    type="text"
                                    name="profilePhoto"
                                    className="form-control"
                                    placeholder="Enter image URL"
                                    value={formData.profilePhoto}
                                    onChange={handleChange}
                                />

                                <small className="text-muted">
                                    We'll add secure image upload later.
                                </small>

                            </div>


                            {/* ACTIONS */}

                            <div className="d-flex justify-content-end gap-2">

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() =>
                                        navigate("/doctor/profile")
                                    }
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="btn btn-netraya px-4"
                                    disabled={saving}
                                >
                                    {saving
                                        ? "Saving..."
                                        : "Save Professional Profile"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            </main>

        </div>

    );
};

export default EditProfile;