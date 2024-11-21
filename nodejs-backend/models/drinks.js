const mongoose = require('mongoose');

const drinksSchema = mongoose.Schema({
    id: Number,
    name: String,
    price: Number,
    volume: String,
    image: String,
    container: String,
    material: String,
})

module.exports = mongoose.model("Drinks", drinksSchema);