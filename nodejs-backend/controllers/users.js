const { response, request } = require('express');

const getAllUsers = (req = request, res = response) => {
    res.status(200).json({
        message: "USERS - GET!",
        result: 12345,
    });
}

const createNewUser = (req = request, res = response) => {
    res.status(200).json({
        message: "USERS - POST!",
        result: 12345,
    });
}

module.exports = {
    getAllUsers,
    createUser: createNewUser
}