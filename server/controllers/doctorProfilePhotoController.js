const fs = require("fs");
const path = require("path");

const { User } = require("../models");


// ==========================================
// UPLOAD DOCTOR PROFILE PHOTO
// ==========================================

const uploadMyDoctorProfilePhoto = async (req, res) => {
    try {

        if (req.user.role !== "DOCTOR") {
            return res.status(403).json({
                message:
                    "Only doctors can upload a profile photo"
            });
        }


        if (!req.file) {
            return res.status(400).json({
                message:
                    "Profile photo is required"
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


        // ======================================
        // DELETE OLD PHOTO
        // ======================================

        if (doctor.profilePhoto) {

            const oldPhotoPath = path.join(
                __dirname,
                "..",
                doctor.profilePhoto
            );

            if (fs.existsSync(oldPhotoPath)) {
                fs.unlinkSync(oldPhotoPath);
            }
        }


        // ======================================
        // SAVE NEW PHOTO PATH
        // ======================================

        doctor.profilePhoto =
            `/uploads/profiles/${req.file.filename}`;


        await doctor.save();


        res.status(200).json({

            message:
                "Doctor profile photo uploaded successfully",

            profilePhoto:
                doctor.profilePhoto

        });

    } catch (error) {

        console.error(
            "Doctor profile photo error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to upload doctor profile photo",

            error:
                error.message

        });

    }
};


module.exports = {
    uploadMyDoctorProfilePhoto
};