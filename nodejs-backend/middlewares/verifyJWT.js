const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const { UsersRespository } = require('../repositories/users');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        })
    }
    try {
        const { username } = jwt.verify(token, process.env.SECRET_KEY)
        const user = await UsersRespository.getOne({ username: username });

        if (!user) {
            return res.status(401).json({
                message: "Invalid token"
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    validateJWT
}