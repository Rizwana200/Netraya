const {
    Patient,
    User
} = require("../models");


// ==========================================
// SEARCH PATIENT BY PHONE
// ==========================================

const searchPatientByPhone = async (req, res) => {

    try {

        const { phone } = req.params;


        const user = await User.findOne({

            where: {
                phone
            },

            attributes: [
                "id",
                "name",
                "phone",
                "role"
            ]

        });


        if (!user) {

            return res.status(404).json({

                message:
                    "No patient found with this phone number"

            });

        }


        if (user.role !== "PATIENT") {

            return res.status(400).json({

                message:
                    "This phone number does not belong to a patient"

            });

        }


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


        res.status(200).json({

            patient: {

                id: patient.id,

                name: user.name,

                phone: user.phone

            }

        });


    } catch (error) {

        console.error(

            "Patient search error:",

            error

        );


        res.status(500).json({

            message:
                "Failed to search patient",

            error:
                error.message

        });

    }

};



module.exports = {

    searchPatientByPhone

};