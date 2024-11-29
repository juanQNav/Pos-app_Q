const { response, request } = require('express');
const { UsersRespository } = require('../repositories/users');

const login = async (req = request, res = response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Incomplete data"
        })
    }

    const user = await UsersRespository.getOne({ username: username, password: password });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    res.status(200).json({
        message: "Login ok!"
    })
}

module.exports = { login }