const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Bill = sequelize.define("Bill", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    billDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    checkupCost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },

    spectaclesCost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },

    spectaclesType: {
        type: DataTypes.STRING,
        allowNull: true
    },

    totalCost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },

    paidAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },

    dueAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0
    },

    status: {
        type: DataTypes.ENUM(
            "DUE",
            "COMPLETED"
        ),
        defaultValue: "DUE"
    }
});

module.exports = Bill;