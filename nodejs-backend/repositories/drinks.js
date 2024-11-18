const Drinks = require('../models/drinks')
const ObjectId = require('mongoose').Types.ObjectId

class drinksRespository {
    static async getAll(query) {
        return await Drinks.find(query)
    }

    static async getById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Drinks.findOne({ _id: id })
    }
}

module.exports = { drinksRespository }