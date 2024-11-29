const { response, request } = require('express');
const { UsersRespository } = require('../repositories/users');

const getAllUsers = async (req = request, res = response) => {
    const { searchTerm } = req.query;

    try {
        const result = await UsersRespository.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error to get users"
        });
    }
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