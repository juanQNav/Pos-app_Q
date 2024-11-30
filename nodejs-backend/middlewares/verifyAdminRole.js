const { request, response } = require("express");


const verifyAdminRole = (req = request, res = response, next) => {
    if (!req.userActive) {
        return res.status(401).json({
            message: "Permission Denied"
        });
    }
    if (req.userActive.role !== "admin") {
        return res.status(401).json({
            message: "Permission Denied"
        });
    }

    next();
}

module.exports = { verifyAdminRole };