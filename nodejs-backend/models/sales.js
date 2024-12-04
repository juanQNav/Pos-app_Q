const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', // Referencia al modelo de usuarios
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    totalAmount: {
        type: Number,
        required: true
    },
    items: [{
        drink: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Drinks', // Referencia al modelo de bebidas
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model("Sales", salesSchema);
