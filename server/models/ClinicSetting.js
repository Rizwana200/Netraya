const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ClinicSetting = sequelize.define("ClinicSetting", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    dailyTokenLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50
    }
});

module.exports = ClinicSetting;