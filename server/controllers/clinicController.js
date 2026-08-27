const { ClinicSetting } = require("../models");

const setDailyTokenLimit = async (req, res) => {
    try {
        const { dailyTokenLimit } = req.body;

        if (!dailyTokenLimit) {
            return res.status(400).json({
                message: "Daily token limit is required"
            });
        }

        if (dailyTokenLimit < 1) {
            return res.status(400).json({
                message: "Daily token limit must be at least 1"
            });
        }

        let setting = await ClinicSetting.findOne();

        if (setting) {
            setting.dailyTokenLimit = dailyTokenLimit;
            await setting.save();
        } else {
            setting = await ClinicSetting.create({
                dailyTokenLimit
            });
        }

        res.status(200).json({
            message: "Daily token limit updated successfully",
            dailyTokenLimit: setting.dailyTokenLimit
        });

    } catch (error) {
        console.error("Token limit error:", error);

        res.status(500).json({
            message: "Failed to update daily token limit",
            error: error.message
        });
    }
};

const getDailyTokenLimit = async (req, res) => {
    try {
        let setting = await ClinicSetting.findOne();

        if (!setting) {
            setting = await ClinicSetting.create({
                dailyTokenLimit: 50
            });
        }

        res.status(200).json({
            dailyTokenLimit: setting.dailyTokenLimit
        });

    } catch (error) {
        console.error("Get token limit error:", error);

        res.status(500).json({
            message: "Failed to get daily token limit",
            error: error.message
        });
    }
};

module.exports = {
    setDailyTokenLimit,
    getDailyTokenLimit
};