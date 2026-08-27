const {
    Token,
    Patient,
    User
} = require("../models");


// ==========================================
// GET DOCTOR DASHBOARD
// ==========================================

const getDoctorDashboard = async (req, res) => {
    try {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        const tokens = await Token.findAll({

            where: {
                tokenDate: today
            },

            include: [
                {
                    model: Patient,

                    include: [
                        {
                            model: User,

                            attributes: [
                                "id",
                                "name",
                                "phone"
                            ]
                        }
                    ]
                }
            ],

            order: [
                [
                    "tokenNumber",
                    "ASC"
                ]
            ]

        });


        const total =
            tokens.length;


        const waiting =
            tokens.filter(
                token =>
                    token.status === "WAITING"
            ).length;


        const withDoctor =
            tokens.filter(
                token =>
                    token.status === "WITH_DOCTOR"
            ).length;


        const completed =
            tokens.filter(
                token =>
                    token.status === "COMPLETED"
            ).length;


        res.status(200).json({

            date: today,

            summary: {

                total,

                waiting,

                withDoctor,

                completed

            },

            patients: tokens.map(
                token => ({

                    tokenId:
                        token.id,

                    tokenNumber:
                        token.tokenNumber,

                    status:
                        token.status,

                    patient: {

                        id:
                            token.Patient?.id,

                        name:
                            token.Patient?.User?.name ||
                            "Unknown",

                        phone:
                            token.Patient?.User?.phone ||
                            ""

                    }

                })
            )

        });

    } catch (error) {

        console.error(
            "Doctor dashboard error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to load doctor dashboard",

            error:
                error.message

        });

    }
};


// ==========================================
// UPDATE DOCTOR TOKEN STATUS
// ==========================================

const updateDoctorTokenStatus = async (
    req,
    res
) => {

    try {

        const {
            tokenId
        } = req.params;

        const {
            status
        } = req.body;


        const allowedStatuses = [
            "CALLED",
            "WITH_DOCTOR",
            "COMPLETED",
            "NO_SHOW"
        ];


        // ==========================================
        // CHECK STATUS
        // ==========================================

        if (
            !allowedStatuses.includes(status)
        ) {

            return res.status(400).json({

                message:
                    "Invalid token status"

            });

        }


        // ==========================================
        // FIND TOKEN
        // ==========================================

        const token =
            await Token.findByPk(
                tokenId
            );


        if (!token) {

            return res.status(404).json({

                message:
                    "Token not found"

            });

        }


        // ==========================================
        // WAITING → CALLED
        // ==========================================

        if (status === "CALLED") {

            if (
                token.status !== "WAITING"
            ) {

                return res.status(400).json({

                    message:
                        "Only WAITING tokens can be called"

                });

            }

        }


        // ==========================================
        // CALLED → WITH_DOCTOR
        // ==========================================

        if (status === "WITH_DOCTOR") {

            if (
                token.status !== "CALLED"
            ) {

                return res.status(400).json({

                    message:
                        "Patient must be CALLED before entering doctor consultation"

                });

            }

        }


        // ==========================================
        // WITH_DOCTOR → COMPLETED
        // ==========================================

        if (status === "COMPLETED") {

            if (
                token.status !== "WITH_DOCTOR"
            ) {

                return res.status(400).json({

                    message:
                        "Only patients currently WITH_DOCTOR can be completed"

                });

            }

        }


        // ==========================================
        // WAITING/CALLED → NO_SHOW
        // ==========================================

        if (status === "NO_SHOW") {

            if (
                token.status !== "WAITING" &&
                token.status !== "CALLED"
            ) {

                return res.status(400).json({

                    message:
                        "Only WAITING or CALLED patients can be marked NO_SHOW"

                });

            }

        }


        // ==========================================
        // UPDATE STATUS
        // ==========================================

        token.status =
            status;


        await token.save();


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(200).json({

            message:
                "Token status updated successfully",

            token: {

                id:
                    token.id,

                tokenNumber:
                    token.tokenNumber,

                patientId:
                    token.patientId,

                status:
                    token.status

            }

        });

    } catch (error) {

        console.error(
            "Doctor token status error:",
            error
        );


        return res.status(500).json({

            message:
                "Failed to update token status",

            error:
                error.message

        });

    }

};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    getDoctorDashboard,

    updateDoctorTokenStatus

};