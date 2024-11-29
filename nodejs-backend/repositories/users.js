const Users = require('../models/users');

class UsersRespository {
    static async getAll(query) {
        return await Users.find(query);
    }
    static async getOne(query) {
        return await Users.findOne(query);
    }
    static async create(userData) {
        const user = new Users(userData);
        return await user.save();
    }
}

module.exports = { UsersRespository };