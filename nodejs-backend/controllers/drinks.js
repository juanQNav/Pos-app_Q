const { response, request } = require('express');
const { drinksRespository } = require('../repositories/drinks');

const getAllDrinks = async (req = request, res = response) => {
    const { searchTerm } = req.query;


    try {
        const result = await drinksRespository.getAll({ name: RegExp(searchTerm) });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error to get drinks"
        })
    }
}

const getDrinkById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await drinksRespository.getById(id);
        if (result === null) {
            res.status(404).json({
                message: "Drink not found"
            });
            return;
        }
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error to get drink by id"
        })
    }
}

const createNewDrink = (req = request, res = response) => {
    res.status(200).json({
        message: "TVSHOWS - POST!",
        result: 12345,
    });
}

module.exports = {
    getAllDrinks,
    createNewDrink,
    getDrinkById
}