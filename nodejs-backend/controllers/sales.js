const { response, request } = require('express');
const { SalesRespository } = require('../repositories/sales');
const { DrinksRespository } = require('../repositories/drinks');
const { UsersRespository } = require('../repositories/users');

const createSale = async (req = request, res = response) => {
    const { userId, items } = req.body;

    // Verificar si el usuario existe
    const user = await UsersRespository.getOne({ _id: userId });
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Verificar si los productos existen y calcular el precio total
    let totalAmount = 0;
    const saleItems = [];

    for (let item of items) {
        const drink = await DrinksRespository.getById(item.drinkId);
        if (!drink) {
            return res.status(404).json({
                message: `Drink with ID ${item.drinkId} not found`
            });
        }

        // Calcula el precio total de la venta
        const itemTotalPrice = drink.price * item.quantity;
        totalAmount += itemTotalPrice;

        saleItems.push({
            drink: drink._id,
            quantity: item.quantity,
            price: itemTotalPrice
        });
    }

    // Crear la venta
    const newSale = {
        user: user._id,
        totalAmount,
        items: saleItems
    };

    try {
        const sale = await SalesRespository.create(newSale);
        res.status(201).json({
            message: "Sale registered successfully",
            sale
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error registering sale"
        });
    }
};

module.exports = { createSale };
