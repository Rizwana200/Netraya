const { User } = require("../models");


// ==========================================
// GET ALL DOCTORS
// PATIENT / STAFF / DOCTOR / ADMIN
// ==========================================

const getAllDoctors = async (req, res) => {

    try {

        const doctors = await User.findAll({

            where: {
                role: "DOCTOR"
            },

            attributes: [
                "id",
                "name",
                "qualification",
                "specialization",
                "experienceYears",
                "expertise",
                "medicalRegistrationNumber",
                "languages",
                "department",
                "bio",
                "profilePhoto"
            ],

            order: [
                ["name", "ASC"]
            ]

        });


        res.status(200).json({
            doctors
        });


    } catch (error) {

        console.error(
            "Get all doctors error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to get doctors",

            error:
                error.message

        });

    }

};


// ==========================================
// GET DOCTOR PROFILE
// ==========================================

const getDoctorProfile = async (req, res) => {

    try {

        const doctorId = Number(
            req.params.doctorId
        );


        if (!doctorId) {

            return res.status(400).json({

                message:
                    "Invalid doctor ID"

            });

        }


        const doctor = await User.findOne({

            where: {
                id: doctorId,
                role: "DOCTOR"
            },

            attributes: [
                "id",
                "name",
                "qualification",
                "specialization",
                "experienceYears",
                "expertise",
                "medicalRegistrationNumber",
                "languages",
                "department",
                "bio",
                "profilePhoto"
            ]

        });


        if (!doctor) {

            return res.status(404).json({

                message:
                    "Doctor not found"

            });

        }


        res.status(200).json({
            doctor
        });


    } catch (error) {

        console.error(
            "Get doctor profile error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to get doctor profile",

            error:
                error.message

        });

    }

};


// ==========================================
// GET OWN DOCTOR PROFILE
// ==========================================

const getMyDoctorProfile = async (req, res) => {

    try {

        if (req.user.role !== "DOCTOR") {

            return res.status(403).json({

                message:
                    "Only doctors can access this profile"

            });

        }


        const doctor = await User.findOne({

            where: {
                id: req.user.id,
                role: "DOCTOR"
            },

            attributes: [
                "id",
                "name",
                "phone",
                "qualification",
                "specialization",
                "experienceYears",
                "expertise",
                "medicalRegistrationNumber",
                "languages",
                "department",
                "bio",
                "profilePhoto"
            ]

        });


        if (!doctor) {

            return res.status(404).json({

                message:
                    "Doctor profile not found"

            });

        }


        res.status(200).json({

            doctor

        });


    } catch (error) {

        console.error(
            "Get own doctor profile error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to get doctor profile",

            error:
                error.message

        });

    }

};


// ==========================================
// UPDATE OWN DOCTOR PROFILE
// ==========================================

const updateMyDoctorProfile = async (req, res) => {

    try {

        if (req.user.role !== "DOCTOR") {

            return res.status(403).json({

                message:
                    "Only doctors can update their own profile"

            });

        }


        const doctor = await User.findOne({

            where: {
                id: req.user.id,
                role: "DOCTOR"
            }

        });


        if (!doctor) {

            return res.status(404).json({

                message:
                    "Doctor profile not found"

            });

        }


        const {
            name,
            qualification,
            specialization,
            experienceYears,
            expertise,
            medicalRegistrationNumber,
            languages,
            department,
            bio,
            profilePhoto
        } = req.body;


        if (name !== undefined) {

            doctor.name = name;

        }


        if (qualification !== undefined) {

            doctor.qualification =
                qualification;

        }


        if (specialization !== undefined) {

            doctor.specialization =
                specialization;

        }


        if (experienceYears !== undefined) {

            doctor.experienceYears =
                experienceYears === ""
                    ? null
                    : Number(experienceYears);

        }


        if (expertise !== undefined) {

            doctor.expertise =
                expertise;

        }


        if (
            medicalRegistrationNumber
            !== undefined
        ) {

            doctor.medicalRegistrationNumber =
                medicalRegistrationNumber;

        }


        if (languages !== undefined) {

            doctor.languages =
                languages;

        }


        if (department !== undefined) {

            doctor.department =
                department;

        }


        if (bio !== undefined) {

            doctor.bio =
                bio;

        }


        if (profilePhoto !== undefined) {

            doctor.profilePhoto =
                profilePhoto;

        }


        await doctor.save();


        res.status(200).json({

            message:
                "Doctor profile updated successfully",

            doctor: {

                id:
                    doctor.id,

                name:
                    doctor.name,

                qualification:
                    doctor.qualification,

                specialization:
                    doctor.specialization,

                experienceYears:
                    doctor.experienceYears,

                expertise:
                    doctor.expertise,

                medicalRegistrationNumber:
                    doctor.medicalRegistrationNumber,

                languages:
                    doctor.languages,

                department:
                    doctor.department,

                bio:
                    doctor.bio,

                profilePhoto:
                    doctor.profilePhoto

            }

        });


    } catch (error) {

        console.error(
            "Update doctor profile error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to update doctor profile",

            error:
                error.message

        });

    }

};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    getAllDoctors,

    getDoctorProfile,

    getMyDoctorProfile,

    updateMyDoctorProfile

};