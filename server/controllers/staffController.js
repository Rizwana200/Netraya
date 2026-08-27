const {
    Token,
    ClinicSetting,
    User
} = require("../models");


// ==========================================
// GET STAFF DASHBOARD SUMMARY
// ==========================================

const getStaffDashboard = async (req, res) => {

    try {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        // ======================================
        // CLINIC SETTINGS
        // ======================================

        let setting =
            await ClinicSetting.findOne();


        if (!setting) {

            setting =
                await ClinicSetting.create({
                    dailyTokenLimit: 50
                });

        }


        // ======================================
        // TODAY'S TOKENS
        // ======================================

        const tokens =
            await Token.findAll({

                where: {
                    tokenDate: today
                }

            });


        const total =
            tokens.length;


        const waiting =
            tokens.filter(
                token =>
                    token.status ===
                    "WAITING"
            ).length;


        const called =
            tokens.filter(
                token =>
                    token.status ===
                    "CALLED"
            ).length;


        const withDoctor =
            tokens.filter(
                token =>
                    token.status ===
                    "WITH_DOCTOR"
            ).length;


        const completed =
            tokens.filter(
                token =>
                    token.status ===
                    "COMPLETED"
            ).length;


        const cancelled =
            tokens.filter(
                token =>
                    token.status ===
                    "CANCELLED"
            ).length;


        const noShow =
            tokens.filter(
                token =>
                    token.status ===
                    "NO_SHOW"
            ).length;


        const remainingTokens =
            Math.max(
                0,
                setting.dailyTokenLimit -
                total
            );


        res.status(200).json({

            date:
                today,

            tokenLimit:
                setting.dailyTokenLimit,

            summary: {

                total,

                waiting,

                called,

                withDoctor,

                completed,

                cancelled,

                noShow,

                remainingTokens

            }

        });


    } catch (error) {

        console.error(
            "Staff dashboard error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to get staff dashboard",

            error:
                error.message

        });

    }

};


// ==========================================
// GET MY STAFF PROFILE
// ==========================================

const getMyStaffProfile = async (req, res) => {

    try {

        if (
            req.user.role !== "STAFF" &&
            req.user.role !== "ADMIN"
        ) {

            return res.status(403).json({

                message:
                    "Only staff can access this profile"

            });

        }


        const staff =
            await User.findOne({

                where: {

                    id:
                        req.user.id,

                    role:
                        req.user.role

                },

                attributes: [

                    "id",

                    "name",

                    "phone",

                    "role",

                    "profilePhoto"

                ]

            });


        if (!staff) {

            return res.status(404).json({

                message:
                    "Staff profile not found"

            });

        }


        res.status(200).json({

            staff

        });


    } catch (error) {

        console.error(
            "Get staff profile error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to get staff profile",

            error:
                error.message

        });

    }

};


module.exports = {

    getStaffDashboard,

    getMyStaffProfile

};