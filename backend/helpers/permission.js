const userModel = require("../models/userModel");

const uploadProductPermission = async (userId) => {
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return false;
        }

        if (user.role !== 'ADMIN') {
            return false;
        }

        return true;
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false
        })
        return false; 
    }
};

module.exports = uploadProductPermission;
