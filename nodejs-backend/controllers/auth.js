const { response, request } = require('express');
const { UsersRespository } = require('../repositories/users');
const { Validations } = require('../helpers/validations');
const bcrypt = require('bcrypt');

const login = async (req = request, res = response) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Incomplete data"
        })
    }

    const user = await UsersRespository.getOne({ username: username });

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    res.status(200).json({
        message: "Login ok!"
    })
}

const register = async (req = request, res = response) => {
    const { username, password } = req.body;
    const saltRounds = process.env.SALT_ROUNDS || 10;

    try {
        Validations.username(username);
        Validations.password(password);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }

    try {
        const user = await UsersRespository.getOne({ username: username });
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
        const newUser = await UsersRespository.create({
            username: username,
            password: hashedPassword,
            role: "user"
        })

        // const simpleUser = {
        //     username: newUser.username,
        //     role: newUser.role,
        //     id: newUser._id
        // }

        const { password: _, ...simpleUser } = newUser.toObject();

        res.status(200).json({
            message: "User created",
            user: simpleUser
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = { login, register }