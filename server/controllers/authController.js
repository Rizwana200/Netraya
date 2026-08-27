const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
    User,
    Patient
} = require("../models");


// ==========================================
// REGISTER
// ==========================================

const register = async (req, res) => {
    try {

        const {
            name,
            phone,
            password,
            role,

            // Patient fields
            dateOfBirth,
            gender,
            address,

            // Doctor fields
            qualification,
            specialization,
            experienceYears,
            expertise,
            medicalRegistrationNumber,
            languages,
            department,
            bio
        } = req.body;


        // ==========================================
        // BASIC VALIDATION
        // ==========================================

        if (!name || !phone || !password || !role) {
            return res.status(400).json({
                message:
                    "Name, phone, password and role are required"
            });
        }


        // ==========================================
        // ALLOWED ROLES
        // ==========================================

        const allowedRoles = [
            "PATIENT",
            "DOCTOR",
            "STAFF"
        ];


        if (!allowedRoles.includes(role)) {
            return res.status(400).json({
                message:
                    "Invalid registration role"
            });
        }


        // ==========================================
        // CHECK DUPLICATE PHONE
        // ==========================================

        const existingUser =
            await User.findOne({
                where: {
                    phone
                }
            });


        if (existingUser) {
            return res.status(409).json({
                message:
                    "An account with this phone number already exists"
            });
        }


        // ==========================================
        // PASSWORD HASH
        // ==========================================

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // ==========================================
        // CREATE USER
        // ==========================================

        const user =
            await User.create({

                name,

                phone,

                password:
                    hashedPassword,

                role,

                // Doctor information
                qualification:
                    role === "DOCTOR"
                        ? qualification || null
                        : null,

                specialization:
                    role === "DOCTOR"
                        ? specialization || null
                        : null,

                experienceYears:
                    role === "DOCTOR"
                        ? experienceYears || null
                        : null,

                expertise:
                    role === "DOCTOR"
                        ? expertise || null
                        : null,

                medicalRegistrationNumber:
                    role === "DOCTOR"
                        ? medicalRegistrationNumber || null
                        : null,

                languages:
                    role === "DOCTOR"
                        ? languages || null
                        : null,

                department:
                    role === "DOCTOR" || role === "STAFF"
                        ? department || null
                        : null,

                bio:
                    role === "DOCTOR"
                        ? bio || null
                        : null

            });


        // ==========================================
        // CREATE PATIENT PROFILE
        // ==========================================

        if (role === "PATIENT") {

            await Patient.create({

                userId:
                    user.id,

                dateOfBirth:
                    dateOfBirth || null,

                gender:
                    gender || null,

                address:
                    address || null

            });

        }


        // ==========================================
        // RESPONSE
        // ==========================================

        return res.status(201).json({

            message:
                "Registration successful",

            user: {

                id:
                    user.id,

                name:
                    user.name,

                phone:
                    user.phone,

                role:
                    user.role

            }

        });

    } catch (error) {

        console.error(
            "Registration error:",
            error
        );


        return res.status(500).json({

            message:
                "Registration failed",

            error:
                error.message

        });

    }
};


// ==========================================
// LOGIN
// ==========================================

const login = async (req, res) => {
    try {

        const {
            phone,
            password
        } = req.body;


        if (!phone || !password) {

            return res.status(400).json({

                message:
                    "Phone and password are required"

            });

        }


        const user =
            await User.findOne({

                where: {
                    phone
                }

            });


        if (!user) {

            return res.status(401).json({

                message:
                    "Invalid phone number or password"

            });

        }


        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                message:
                    "Invalid phone number or password"

            });

        }


        const token =
            jwt.sign(

                {
                    id:
                        user.id,

                    role:
                        user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        "1d"
                }

            );


        return res.status(200).json({

            message:
                "Login successful",

            token,

            user: {

                id:
                    user.id,

                name:
                    user.name,

                phone:
                    user.phone,

                role:
                    user.role

            }

        });

    } catch (error) {

        console.error(
            "Login error:",
            error
        );


        return res.status(500).json({

            message:
                "Login failed",

            error:
                error.message

        });

    }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {

    register,

    login

};