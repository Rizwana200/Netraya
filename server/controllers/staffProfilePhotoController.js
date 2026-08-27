const fs = require("fs");
const path = require("path");

const { User } = require("../models");


// ==========================================
// UPLOAD STAFF PROFILE PHOTO
// ==========================================

const uploadMyStaffProfilePhoto = async (req, res) => {
    try {

        if (
            req.user.role !== "STAFF" &&
            req.user.role !== "ADMIN"
        ) {
            return res.status(403).json({
                message:
                    "Only staff can upload a staff profile photo"
            });
        }


        if (!req.file) {
            return res.status(400).json({
                message:
                    "Profile photo is required"
            });
        }


        const staff = await User.findOne({
            where: {
                id: req.user.id,
                role: req.user.role
            }
        });


        if (!staff) {
            return res.status(404).json({
                message:
                    "Staff profile not found"
            });
        }


        // ======================================
        // DELETE OLD PHOTO
        // ======================================

        if (staff.profilePhoto) {

            const oldPhotoPath = path.join(
                __dirname,
                "..",
                staff.profilePhoto
            );

            if (fs.existsSync(oldPhotoPath)) {
                fs.unlinkSync(oldPhotoPath);
            }
        }


        // ======================================
        // SAVE NEW PHOTO PATH
        // ======================================

        staff.profilePhoto =
            `/uploads/profiles/${req.file.filename}`;


        await staff.save();


        res.status(200).json({

            message:
                "Staff profile photo uploaded successfully",

            profilePhoto:
                staff.profilePhoto

        });

    } catch (error) {

        console.error(
            "Staff profile photo error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to upload staff profile photo",

            error:
                error.message

        });

    }
};


module.exports = {
    uploadMyStaffProfilePhoto
};