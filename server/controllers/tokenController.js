const {
    Token,
    Patient,
    User,
    ClinicSetting
} = require("../models");


// ==========================================
// GENERATE TOKEN
// ==========================================

const generateToken = async (req, res) => {

    try {

        let { patientId, source } = req.body;


        // ======================================
        // PATIENT CAN ONLY GENERATE THEIR
        // OWN TOKEN
        // ======================================

        if (req.user.role === "PATIENT") {

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


            // Ignore any patientId sent by frontend
            // and use the authenticated patient's ID.

            patientId = patient.id;

            source = "WEBSITE";

        }


        // ======================================
        // STAFF / ADMIN
        // MUST PROVIDE PATIENT ID + SOURCE
        // ======================================

        else {

            if (!patientId || !source) {

                return res.status(400).json({

                    message:
                        "Patient ID and token source are required"

                });

            }

            if (
                ![
                    "WEBSITE",
                    "PHONE",
                    "WALK_IN"
                ].includes(source)
            ) {

                return res.status(400).json({

                    message:
                        "Invalid token source"

                });

            }

        }


        // ======================================
        // CHECK PATIENT
        // ======================================

        const patient =
            await Patient.findByPk(patientId);


        if (!patient) {

            return res.status(404).json({

                message:
                    "Patient not found"

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
        // DUPLICATE TOKEN CHECK
        // ======================================

        const existingToken =
            await Token.findOne({

                where: {

                    patientId,

                    tokenDate: today

                }

            });


        if (existingToken) {

            return res.status(409).json({

                message:
                    "You already have a token for today",

                token: {

                    id:
                        existingToken.id,

                    tokenNumber:
                        existingToken.tokenNumber,

                    tokenDate:
                        existingToken.tokenDate,

                    status:
                        existingToken.status,

                    source:
                        existingToken.source,

                    patientId:
                        existingToken.patientId

                }

            });

        }


        // ======================================
        // CLINIC TOKEN SETTING
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
        // TODAY TOKEN COUNT
        // ======================================

        const todayTokenCount =
            await Token.count({

                where: {

                    tokenDate:
                        today

                }

            });


        if (
            todayTokenCount >=
            setting.dailyTokenLimit
        ) {

            return res.status(400).json({

                message:
                    "Today's token limit has been reached",

                dailyTokenLimit:
                    setting.dailyTokenLimit

            });

        }


        // ======================================
        // NEXT TOKEN NUMBER
        // ======================================

        const lastToken =
            await Token.findOne({

                where: {

                    tokenDate:
                        today

                },

                order: [
                    [
                        "tokenNumber",
                        "DESC"
                    ]
                ]

            });


        const nextTokenNumber =
            lastToken
                ? lastToken.tokenNumber + 1
                : 1;


        // ======================================
        // CREATE TOKEN
        // ======================================

        const token =
            await Token.create({

                patientId,

                tokenNumber:
                    nextTokenNumber,

                tokenDate:
                    today,

                status:
                    "WAITING",

                source

            });


        // ======================================
        // RESPONSE
        // ======================================

        res.status(201).json({

            message:
                "Token generated successfully",

            token: {

                id:
                    token.id,

                tokenNumber:
                    token.tokenNumber,

                tokenDate:
                    token.tokenDate,

                status:
                    token.status,

                source:
                    token.source,

                patientId:
                    token.patientId

            }

        });


    } catch (error) {

        console.error(
            "Token generation error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to generate token",

            error:
                error.message

        });

    }

};


// ==========================================
// GET TODAY'S QUEUE
// ==========================================

const getTodayQueue = async (req, res) => {

    try {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        const tokens =
            await Token.findAll({

                where: {

                    tokenDate:
                        today

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


        const currentToken =
            tokens.find(
                token =>
                    token.status ===
                        "CALLED" ||
                    token.status ===
                        "WITH_DOCTOR"
            );


        res.status(200).json({

            date:
                today,

            summary: {

                total,

                waiting,

                called,

                withDoctor,

                completed,

                cancelled,

                noShow

            },

            currentToken:
                currentToken
                    ? currentToken.tokenNumber
                    : null,

            queue:

                tokens.map(
                    token => ({

                        tokenId:
                            token.id,

                        tokenNumber:
                            token.tokenNumber,

                        status:
                            token.status,

                        source:
                            token.source,

                        patient: {

                            id:
                                token.Patient.id,

                            name:
                                token.Patient.User.name,

                            phone:
                                token.Patient.User.phone

                        }

                    })
                )

        });

    } catch (error) {

        console.error(
            "Get queue error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to get today's queue",

            error:
                error.message

        });

    }

};


// ==========================================
// UPDATE TOKEN STATUS
// ==========================================

const updateTokenStatus = async (req, res) => {

    try {

        const {
            tokenId
        } = req.params;


        const {
            status
        } = req.body;


        const allowedStatuses = [

            "WAITING",

            "CALLED",

            "WITH_DOCTOR",

            "COMPLETED",

            "CANCELLED",

            "NO_SHOW"

        ];


        if (
            !allowedStatuses.includes(
                status
            )
        ) {

            return res.status(400).json({

                message:
                    "Invalid token status"

            });

        }


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


        token.status =
            status;


        await token.save();


        res.status(200).json({

            message:
                "Token status updated successfully",

            token: {

                id:
                    token.id,

                tokenNumber:
                    token.tokenNumber,

                status:
                    token.status,

                patientId:
                    token.patientId

            }

        });


    } catch (error) {

        console.error(
            "Token status error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to update token status",

            error:
                error.message

        });

    }

};


module.exports = {

    generateToken,

    getTodayQueue,

    updateTokenStatus

};