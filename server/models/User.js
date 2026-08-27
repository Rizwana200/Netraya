const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM(
            "PATIENT",
            "STAFF",
            "DOCTOR",
            "ADMIN"
        ),
        allowNull: false
    },

    // ==========================================
    // DOCTOR PROFESSIONAL PROFILE
    // ==========================================

    qualification: {
        type: DataTypes.STRING,
        allowNull: true
    },

    specialization: {
        type: DataTypes.STRING,
        allowNull: true
    },

    experienceYears: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    expertise: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    medicalRegistrationNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },

    languages: {
        type: DataTypes.STRING,
        allowNull: true
    },

    department: {
        type: DataTypes.STRING,
        allowNull: true
    },

    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = User;