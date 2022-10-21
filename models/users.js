const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({
    username: String,
    password: String,
    email: String,
    priv: Number

})

module.exports = mongoose.model('User', userSchema);