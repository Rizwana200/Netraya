const fs = require("fs");
const path = require("path");

const {
    Patient,
    User
} = require("../models");


// ==========================================
// GET MY PATIENT PROFILE
// ==========================================

const getMyPatientProfile = async (req, res) => {

    try {

        if (req.user.role !== "PATIENT") {

            return res.status(403).json({
                message: "Only patients can access this profile"
            });

        }


        const patient = await Patient.findOne({

            where: {
                userId: req.user.id
            },

            include: [
                {
                    model: User,
                    attributes: [
                        "id",
                        "name",
                        "phone",
                        "role"
                    ]
                }
            ]

        });


        if (!patient) {

            return res.status(404).json({
                message: "Patient profile not found"
            });

        }


        res.status(200).json({

            patient: {
                id: patient.id,

                userId: patient.userId,

                name: patient.User?.name || "",

                phone: patient.User?.phone || "",

                dateOfBirth:
                    patient.dateOfBirth,

                gender:
                    patient.gender,

                address:
                    patient.address,

                profilePhoto:
                    patient.profilePhoto
            }

        });


    } catch (error) {

        console.error(
            "Get patient profile error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to get patient profile",

            error:
                error.message

        });

    }

};


// ==========================================
// UPLOAD MY PROFILE PHOTO
// ==========================================

const uploadMyProfilePhoto = async (req, res) => {

    try {

        if (req.user.role !== "PATIENT") {

            return res.status(403).json({
                message:
                    "Only patients can upload a profile photo"
            });

        }


        if (!req.file) {

            return res.status(400).json({
                message:
                    "Profile photo is required"
            });

        }


        const patient = await Patient.findOne({

            where: {
                userId: req.user.id
            }

        });


        if (!patient) {

            return res.status(404).json({
                message:
                    "Patient profile not found"
            });

        }


        // ======================================
        // DELETE OLD PHOTO
        // ======================================

        if (patient.profilePhoto) {

            const oldPhotoPath =
                path.join(
                    __dirname,
                    "..",
                    patient.profilePhoto
                );

            if (fs.existsSync(oldPhotoPath)) {

                fs.unlinkSync(oldPhotoPath);

            }

        }


        // ======================================
        // SAVE NEW PHOTO PATH
        // ======================================

        patient.profilePhoto =
            `/uploads/profiles/${req.file.filename}`;


        await patient.save();


        res.status(200).json({

            message:
                "Profile photo uploaded successfully",

            profilePhoto:
                patient.profilePhoto

        });


    } catch (error) {

        console.error(
            "Patient profile photo error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to upload profile photo",

            error:
                error.message

        });

    }

};


module.exports = {

    getMyPatientProfile,

    uploadMyProfilePhoto

};