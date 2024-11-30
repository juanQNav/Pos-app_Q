const jwt = require("jsonwebtoken");

const generateJWT = (username = "") => {
    return new Promise((resolve, reject) => {
        const payload = { username };
        jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: "4h"
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject("Not possible to generate JWT");
            } else {
                resolve(token);
            }
        })
    })
}

module.exports = { generateJWT };