const { response, request } = require('express');
const { DrinksRespository: DrinksRespository } = require('../repositories/drinks');

const getAllDrinks = async (req = request, res = response) => {
    const { searchTerm } = req.query;


    try {
        const result = await DrinksRespository.getAll({ name: RegExp(searchTerm) });
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
        const result = await DrinksRespository.getById(id);
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

const createNewDrink = async (req = request, res = response) => {
    const { id, name, price, volume, image, container, material } = req.body;
    const drinkData = { id, name, price, volume, image, container, material };

    if (!id || !name || !price || !volume || !image || !container || !material) {
        return res.status(400).json({
            message: "Incomplete data",
        });
    }

    try {
        const savedDrink = await DrinksRespository.create(drinkData);
        res.status(201).json({
            savedDrink
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error add new element"
        })
    }
}

const deleteDrinkById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const result = await DrinksRespository.deleteById(id);
        if (result.deletedCount === 0) {
            res.status(404).json({
                message: "Drink not found"
            });
            return;
        }
        res.status(200).json({
            message: "Drink deleted"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error to delete drink"
        })
    }
}
const updateDrinkById = async (req = request, res = response) => {
    const { id } = req.params;
    const { name, price, volume, image, container, material } = req.body;
    const updateData = { name, price, volume, image, container, material };

    if (!name || !price || !volume || !image || !container || !material) {
        return res.status(400).json({
            message: "Incomplete data",
        });
    }

    try {
        const result = await DrinksRespository.updateById(id, updateData);
        if (result.n === 0) {
            res.status(404).json({
                message: "Drink not found"
            });
            return;
        }
        res.status(200).json({
            message: "Drink updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error to update drink"
        })
    }
}

module.exports = {
    getAllDrinks,
    createNewDrink,
    getDrinkById,
    deleteDrinkById,
    updateDrinkById
}