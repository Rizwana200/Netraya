const {
    Patient,
    User,
    Token,
    ClinicSetting
} = require("../models");


// ==========================================
// GET PATIENT DASHBOARD
// ==========================================

const getPatientDashboard = async (req, res) => {

    try {

        // ======================================
        // FIND LOGGED-IN USER
        // ======================================

        const user = await User.findByPk(
            req.user.id,
            {
                attributes: [
                    "id",
                    "name",
                    "phone",
                    "role"
                ]
            }
        );


        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }


        // ======================================
        // FIND PATIENT USING USER ASSOCIATION
        // ======================================

        const patient = await Patient.findOne({

            where: {
                userId: user.id
            }

        });


        if (!patient) {

            return res.status(404).json({
                message:
                    "Patient profile not found"
            });

        }


        // ======================================
        // TODAY
        // ======================================

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

        const todayTokens =
            await Token.findAll({

                where: {
                    tokenDate: today
                },

                order: [
                    [
                        "tokenNumber",
                        "ASC"
                    ]
                ]

            });


        // ======================================
        // MY TOKEN
        // ======================================

        const myToken =
            todayTokens.find(
                token =>
                    Number(token.patientId) ===
                    Number(patient.id)
            );


        // ======================================
        // CURRENT TOKEN
        // ======================================

        const activeToken =
            todayTokens.find(
                token =>
                    token.status === "CALLED" ||
                    token.status === "WITH_DOCTOR"
            );


        const currentToken =
            activeToken
                ? activeToken.tokenNumber
                : null;


        // ======================================
        // PATIENTS AHEAD
        // ======================================

        let patientsAhead = 0;


        if (myToken) {

            patientsAhead =
                todayTokens.filter(
                    token =>

                        Number(token.tokenNumber) <
                        Number(myToken.tokenNumber) &&

                        [
                            "WAITING",
                            "CALLED",
                            "WITH_DOCTOR"
                        ].includes(
                            token.status
                        )

                ).length;

        }


        // ======================================
        // TOTAL
        // ======================================

        const totalTokens =
            todayTokens.length;


        // ======================================
        // REMAINING
        // ======================================

        const remainingTokens =
            Math.max(
                0,
                Number(setting.dailyTokenLimit) -
                totalTokens
            );


        // ======================================
        // RESPONSE
        // ======================================

        res.status(200).json({

            patient: {

                id:
                    patient.id,

                userId:
                    user.id,

                name:
                    user.name,

                phone:
                    user.phone

            },

            today: {

                date:
                    today,

                token:
                    myToken
                        ? {
                            id:
                                myToken.id,

                            tokenNumber:
                                myToken.tokenNumber,

                            tokenDate:
                                myToken.tokenDate,

                            status:
                                myToken.status,

                            source:
                                myToken.source
                        }
                        : null,

                currentToken,

                patientsAhead,

                totalTokens,

                tokenLimit:
                    setting.dailyTokenLimit,

                remainingTokens

            }

        });


    } catch (error) {

        console.error(
            "Patient dashboard error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to load patient dashboard",

            error:
                error.message

        });

    }

};


module.exports = {
    getPatientDashboard
};