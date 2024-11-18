const mongoose = require('mongoose');

const drinksSchema = mongoose.Schema({
    Producto: String,
    Envase: String,
    Material: String,
    Volumen: String,
    Precio: Number,
    Image: String,
})

module.exports = mongoose.model("Drinks", drinksSchema);