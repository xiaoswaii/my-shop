const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema ({
    user_id: String,
    stock_id: String,
    amount: Number
})

module.exports = mongoose.model('Purchase', purchaseSchema);