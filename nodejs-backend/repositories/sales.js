const Sales = require('../models/sales');
const ObjectId = require('mongoose').Types.ObjectId;

class SalesRespository {
    static async create(saleData) {
        const sale = new Sales(saleData);
        return await sale.save();
    }

    static async getAll(query) {
        return await Sales.find(query).populate('user', 'username').populate('items.drink');
    }

    static async getById(id) {
        if (!ObjectId.isValid(id)) {
            return null;
        }
        return await Sales.findOne({ _id: id }).populate('user', 'username').populate('items.drink');
    }
}

module.exports = { SalesRespository };
