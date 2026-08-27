const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Patient = sequelize.define("Patient", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },

    gender: {
        type: DataTypes.ENUM(
            "MALE",
            "FEMALE",
            "OTHER"
        ),
        allowNull: true
    },

    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    // ==========================================
    // PATIENT PROFILE PHOTO
    // ==========================================

    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Patient;