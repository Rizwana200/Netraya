const {
    Patient,
    User,
    EyeVisit,
    Document,
    Bill
} = require("../models");


// ==========================================
// GET COMPLETE PATIENT HISTORY
// ==========================================

const getPatientHistory = async (req, res) => {

    try {

        const { patientId } = req.params;


        // ------------------------------------------
        // Find patient
        // ------------------------------------------

        const patient = await Patient.findByPk(

            patientId,

            {
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

        );


        if (!patient) {

            return res.status(404).json({

                message: "Patient not found"

            });

        }


        // ------------------------------------------
        // Eye visits
        // ------------------------------------------

        const visits = await EyeVisit.findAll({

            where: {
                patientId
            },

            include: [

                {
                    model: User,

                    as: "Doctor",

                    attributes: [
                        "id",
                        "name"
                    ]
                },

                {
                    model: Document,

                    attributes: [
                        "id",
                        "documentName",
                        "documentType",
                        "fileName",
                        "filePath",
                        "uploadedAt"
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


        // ------------------------------------------
        // All documents
        // ------------------------------------------

        const documents = await Document.findAll({

            where: {
                patientId
            },

            include: [

                {
                    model: EyeVisit,

                    attributes: [
                        "id",
                        "visitDate",
                        "diagnosis"
                    ]
                }

            ],

            order: [

                [
                    "uploadedAt",
                    "DESC"
                ]

            ]

        });


        // ------------------------------------------
        // All bills
        // ------------------------------------------

        const bills = await Bill.findAll({

            where: {
                patientId
            },

            order: [

                [
                    "billDate",
                    "DESC"
                ],

                [
                    "id",
                    "DESC"
                ]

            ]

        });


        // ------------------------------------------
        // Response
        // ------------------------------------------

        res.status(200).json({

            patient: {

                id: patient.id,

                name: patient.User.name,

                phone: patient.User.phone

            },

            totalVisits: visits.length,

            totalDocuments: documents.length,

            totalBills: bills.length,

            visits,

            documents,

            bills

        });


    } catch (error) {

        console.error(

            "Get patient history error:",

            error

        );


        res.status(500).json({

            message:
                "Failed to get patient history",

            error:
                error.message

        });

    }

};



module.exports = {

    getPatientHistory

};