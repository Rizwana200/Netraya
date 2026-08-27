const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const EyeVisit = sequelize.define("EyeVisit", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    visitDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    rightVisualAcuity: {
        type: DataTypes.STRING,
        allowNull: true
    },

    leftVisualAcuity: {
        type: DataTypes.STRING,
        allowNull: true
    },

    rightSphere: {
        type: DataTypes.STRING,
        allowNull: true
    },

    rightCylinder: {
        type: DataTypes.STRING,
        allowNull: true
    },

    rightAxis: {
        type: DataTypes.STRING,
        allowNull: true
    },

    leftSphere: {
        type: DataTypes.STRING,
        allowNull: true
    },

    leftCylinder: {
        type: DataTypes.STRING,
        allowNull: true
    },

    leftAxis: {
        type: DataTypes.STRING,
        allowNull: true
    },

    rightIOP: {
        type: DataTypes.STRING,
        allowNull: true
    },

    leftIOP: {
        type: DataTypes.STRING,
        allowNull: true
    },

    diagnosis: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    doctorNotes: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    followUpDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    }
});

module.exports = EyeVisit;