const bcrypt = require("bcrypt");

const {
    User,
    Patient
} = require("../models");


// Register patient
const registerPatient = async (req, res) => {
    try {
        const {
            name,
            phone,
            password,
            dateOfBirth,
            gender,
            address
        } = req.body;


        // Validate required fields
        if (!name || !phone || !password) {
            return res.status(400).json({
                message: "Name, phone and password are required"
            });
        }


        // Check existing phone number
        const existingUser = await User.findOne({
            where: {
                phone
            }
        });


        if (existingUser) {
            return res.status(409).json({
                message: "An account already exists with this phone number"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Create user
        const user = await User.create({
            name,
            phone,
            password: hashedPassword,
            role: "PATIENT"
        });


        // Create patient profile
        const patient = await Patient.create({
            userId: user.id,
            dateOfBirth,
            gender,
            address
        });


        res.status(201).json({
            message: "Patient account created successfully",

            patient: {
                id: patient.id,
                userId: user.id,
                name: user.name,
                phone: user.phone,
                dateOfBirth: patient.dateOfBirth,
                gender: patient.gender,
                address: patient.address
            }
        });


    } catch (error) {

        console.error(
            "Patient registration error:",
            error
        );

        res.status(500).json({
            message: "Patient registration failed",
            error: error.message
        });
    }
};


// Search patient by phone
const searchPatientByPhone = async (req, res) => {
    try {

        const {
            phone
        } = req.params;


        if (!phone) {
            return res.status(400).json({
                message: "Phone number is required"
            });
        }


        const user = await User.findOne({
            where: {
                phone,
                role: "PATIENT"
            },

            include: [
                {
                    model: Patient
                }
            ]
        });


        if (!user) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }


        res.status(200).json({

            message: "Patient found",

            patient: {
                id: user.Patient.id,
                userId: user.id,
                name: user.name,
                phone: user.phone,
                dateOfBirth: user.Patient.dateOfBirth,
                gender: user.Patient.gender,
                address: user.Patient.address
            }

        });


    } catch (error) {

        console.error(
            "Patient search error:",
            error
        );

        res.status(500).json({
            message: "Patient search failed",
            error: error.message
        });
    }
};


module.exports = {
    registerPatient,
    searchPatientByPhone
};