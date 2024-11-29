const Drinks = require('../models/drinks')
const ObjectId = require('mongoose').Types.ObjectId

class DrinksRespository {
    static async getAll(query) {
        return await Drinks.find(query)
    }

    static async getById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Drinks.findOne({ _id: id })
    }
    static async create(drinkData) {
        const drink = new Drinks(drinkData)
        return await drink.save()
    }
    static async deleteById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Drinks.deleteOne({ _id: id });
    }
    static async updateById(id, updateData) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Drinks.updateOne({ _id: id }, updateData);
    }
}

module.exports = { DrinksRespository: DrinksRespository }