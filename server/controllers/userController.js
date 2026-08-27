const bcrypt = require("bcrypt");
const { User } = require("../models");

const createStaffOrDoctor = async (req, res) => {
    try {
        const {
            name,
            phone,
            password,
            role
        } = req.body;

        if (!name || !phone || !password || !role) {
            return res.status(400).json({
                message: "Name, phone, password and role are required"
            });
        }

        if (!["STAFF", "DOCTOR"].includes(role)) {
            return res.status(400).json({
                message: "Role must be STAFF or DOCTOR"
            });
        }

        const existingUser = await User.findOne({
            where: { phone }
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this phone number"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            phone,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: `${role} account created successfully`,
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                role: user.role
            }
        });

    } catch (error) {
        console.error("User creation error:", error);

        res.status(500).json({
            message: "Failed to create user",
            error: error.message
        });
    }
};

module.exports = {
    createStaffOrDoctor
};