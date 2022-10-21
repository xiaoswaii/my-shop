const mongoose = require('mongoose');

const stockSchema = mongoose.Schema ({
    title: String,
    description: String,
    price: Number,
    amount: Number,
    left_amount: Number,
    picture: String
})

module.exports = mongoose.model('Stock', stockSchema);