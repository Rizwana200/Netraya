const path = require("path");

const {
    Document,
    Patient,
    EyeVisit,
    User
} = require("../models");


// ==========================================
// UPLOAD DOCUMENT
// ==========================================

const uploadDocument = async (req, res) => {

    try {

        const { patientId } = req.params;

        const {
            documentName,
            documentType,
            eyeVisitId
        } = req.body;


        // ------------------------------------------
        // Check file
        // ------------------------------------------

        if (!req.file) {

            return res.status(400).json({

                message: "Please upload a document"

            });

        }


        // ------------------------------------------
        // Check patient
        // ------------------------------------------

        const patient = await Patient.findByPk(patientId);


        if (!patient) {

            return res.status(404).json({

                message: "Patient not found"

            });

        }


        // ------------------------------------------
        // Validate document name
        // ------------------------------------------

        if (!documentName) {

            return res.status(400).json({

                message: "Document name is required"

            });

        }


        // ------------------------------------------
        // Validate document type
        // ------------------------------------------

        const allowedTypes = [

            "PRESCRIPTION",

            "EYE_REPORT",

            "EYE_SCAN",

            "SPECTACLE_PRESCRIPTION",

            "OTHER"

        ];


        if (!documentType) {

            return res.status(400).json({

                message: "Document type is required"

            });

        }


        if (!allowedTypes.includes(documentType)) {

            return res.status(400).json({

                message: "Invalid document type"

            });

        }


        // ------------------------------------------
        // Check eye visit if provided
        // ------------------------------------------

        if (eyeVisitId) {

            const eyeVisit = await EyeVisit.findOne({

                where: {

                    id: eyeVisitId,

                    patientId

                }

            });


            if (!eyeVisit) {

                return res.status(404).json({

                    message:
                        "Eye visit not found for this patient"

                });

            }

        }


        // ------------------------------------------
        // Uploaded by
        // ------------------------------------------

        const uploadedBy = req.user.id;


        // ------------------------------------------
        // Create document
        // ------------------------------------------

        const document = await Document.create({

            patientId,

            eyeVisitId:
                eyeVisitId || null,

            documentName,

            documentType,

            fileName:
                req.file.originalname,

            filePath:
                req.file.path,

            uploadedBy

        });


        // ------------------------------------------
        // Response
        // ------------------------------------------

        res.status(201).json({

            message:
                "Document uploaded successfully",

            document

        });


    } catch (error) {

        console.error(
            "Upload document error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to upload document",

            error:
                error.message

        });

    }

};



// ==========================================
// GET PATIENT DOCUMENTS
// ==========================================

const getPatientDocuments = async (req, res) => {

    try {

        const { patientId } = req.params;


        // ------------------------------------------
        // Check patient
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

                message:
                    "Patient not found"

            });

        }


        // ------------------------------------------
        // Get documents
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

                },

                {

                    model: User,

                    as: "Uploader",

                    attributes: [

                        "id",

                        "name",

                        "role"

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
        // Response
        // ------------------------------------------

        res.status(200).json({

            patient: {

                id: patient.id,

                name: patient.User.name,

                phone: patient.User.phone

            },

            totalDocuments:
                documents.length,

            documents

        });


    } catch (error) {

        console.error(

            "Get patient documents error:",

            error

        );


        res.status(500).json({

            message:
                "Failed to get patient documents",

            error:
                error.message

        });

    }

};



// ==========================================
// GET SINGLE DOCUMENT
// ==========================================

const getDocument = async (req, res) => {

    try {

        const { documentId } = req.params;


        const document =
            await Document.findByPk(

                documentId,

                {

                    include: [

                        {

                            model: Patient,

                            attributes: [

                                "id"

                            ]

                        },

                        {

                            model: EyeVisit,

                            attributes: [

                                "id",

                                "visitDate",

                                "diagnosis"

                            ]

                        },

                        {

                            model: User,

                            as: "Uploader",

                            attributes: [

                                "id",

                                "name",

                                "role"

                            ]

                        }

                    ]

                }

            );


        if (!document) {

            return res.status(404).json({

                message:
                    "Document not found"

            });

        }


        res.status(200).json({

            document

        });


    } catch (error) {

        console.error(

            "Get document error:",

            error

        );


        res.status(500).json({

            message:
                "Failed to get document",

            error:
                error.message

        });

    }

};



module.exports = {

    uploadDocument,

    getPatientDocuments,

    getDocument

};