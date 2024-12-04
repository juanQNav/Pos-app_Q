const { response, request } = require('express');
const { DrinksRespository: DrinksRespository } = require('../repositories/drinks');
const fs = require('fs');
const path = require('path');

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

const createNewDrink = async (req, res) => {
    const { name, price, volume, container, material } = req.body;
    const newProductData = { name, price, volume, container, material };

    if (!name || !price || !volume || !container || !material) {
        return res.status(400).json({
            message: "Incomplete data",
        });
    }

    try {
        const newDrink = await DrinksRespository.create(newProductData);

        if (req.file) {
            const imagePath = path.join(__dirname, '../../angular-frontend/public/images/products', `${newDrink._id}${path.extname(req.file.originalname)}`);

            fs.renameSync(req.file.path, imagePath);

            newDrink.image = `images/products/${newDrink._id}${path.extname(req.file.originalname)}`;
            await newDrink.save();
        }
        res.status(201).json({
            message: "Drink created successfully",
            drink: newDrink,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating drink",
        });
    }
};

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
    const { name, price, volume, container, material } = req.body;
    const updateData = { name, price, volume, container, material };

    if (req.file) {
        const oldImagePath = path.join(__dirname, '../../angular-frontend/public', req.body.oldImage);
        const newImagePath = path.join(__dirname, '../../angular-frontend/public/images/products', `${id}${path.extname(req.file.originalname)}`);

        if (oldImagePath !== newImagePath && fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }

        updateData.image = `images/products/${id}${path.extname(req.file.originalname)}`;
    }

    if (!name || !price || !volume || !container || !material) {
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
            message: "Drink updated",
            drink: updateData
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