const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Document = sequelize.define("Document", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    eyeVisitId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    documentName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    documentType: {
        type: DataTypes.ENUM(
            "PRESCRIPTION",
            "EYE_REPORT",
            "EYE_SCAN",
            "SPECTACLE_PRESCRIPTION",
            "OTHER"
        ),
        allowNull: false
    },

    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    filePath: {
        type: DataTypes.STRING,
        allowNull: false
    },

    uploadedBy: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    uploadedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Document;