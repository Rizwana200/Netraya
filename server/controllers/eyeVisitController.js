const {
    EyeVisit,
    Patient,
    User
} = require("../models");


// ==========================================
// CREATE EYE EXAMINATION
// ==========================================

const createEyeVisit = async (req, res) => {
    try {

        const { patientId } = req.params;

        const {
            visitDate,
            rightVisualAcuity,
            leftVisualAcuity,
            rightSphere,
            rightCylinder,
            rightAxis,
            leftSphere,
            leftCylinder,
            leftAxis,
            rightIOP,
            leftIOP,
            diagnosis,
            doctorNotes,
            followUpDate
        } = req.body;


        const patient = await Patient.findByPk(patientId);

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }


        if (req.user.role !== "DOCTOR") {
            return res.status(403).json({
                message: "Only doctors can create eye examination records"
            });
        }


        const eyeVisit = await EyeVisit.create({

            patientId,

            doctorId: req.user.id,

            visitDate:
                visitDate ||
                new Date(),

            rightVisualAcuity,
            leftVisualAcuity,

            rightSphere,
            rightCylinder,
            rightAxis,

            leftSphere,
            leftCylinder,
            leftAxis,

            rightIOP,
            leftIOP,

            diagnosis,
            doctorNotes,
            followUpDate
        });


        res.status(201).json({

            message:
                "Eye examination saved successfully",

            visit: eyeVisit

        });


    } catch (error) {

        console.error(
            "Eye visit error:",
            error
        );

        res.status(500).json({

            message:
                "Failed to save eye examination",

            error:
                error.message

        });

    }
};


// ==========================================
// GET EYE HISTORY
// ==========================================

const getEyeHistory = async (req, res) => {

    try {

        let targetPatientId;


        // ======================================
        // PATIENT
        // ======================================

        if (req.user.role === "PATIENT") {

            // Find the patient profile belonging
            // to the logged-in user.

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


            // Use the actual Patient ID.
            targetPatientId = patient.id;

        }


        // ======================================
        // STAFF / DOCTOR / ADMIN
        // ======================================

        else {

            targetPatientId =
                Number(req.params.patientId);


            if (!targetPatientId) {

                return res.status(400).json({

                    message:
                        "Invalid patient ID"

                });

            }

        }


        // ======================================
        // CHECK PATIENT EXISTS
        // ======================================

        const patient =
            await Patient.findByPk(
                targetPatientId
            );


        if (!patient) {

            return res.status(404).json({

                message:
                    "Patient not found"

            });

        }


        // ======================================
        // GET EYE HISTORY
        // ======================================

        const visits =
            await EyeVisit.findAll({

                where: {

                    patientId:
                        targetPatientId

                },

                include: [

                    {

                        model: User,

                        as: "Doctor",

                        attributes: [
                            "id",
                            "name"
                        ]

                    }

                ],

                order: [

                    [
                        "visitDate",
                        "DESC"
                    ]

                ]

            });


        // ======================================
        // RESPONSE
        // ======================================

        res.status(200).json({

            patientId:
                targetPatientId,

            totalVisits:
                visits.length,

            visits

        });


    } catch (error) {

        console.error(
            "Eye history error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to get eye history",

            error:
                error.message

        });

    }

};


module.exports = {

    createEyeVisit,

    getEyeHistory

};