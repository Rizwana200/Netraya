const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Token = sequelize.define("Token", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    tokenNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    tokenDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM(
            "WAITING",
            "CALLED",
            "WITH_DOCTOR",
            "COMPLETED",
            "CANCELLED",
            "NO_SHOW"
        ),
        defaultValue: "WAITING"
    },

    source: {
        type: DataTypes.ENUM(
            "WEBSITE",
            "PHONE",
            "WALK_IN"
        ),
        allowNull: false
    }
});

module.exports = Token;