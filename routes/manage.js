var express = require('express');
const Stock = require('../models/stock');
const User = require('../models/users');
const verify = require('./verifyToken');
var router = express.Router();

router.get('/',verify , async function(req, res, next) {
    const user = await User.findOne({ _id: req.user._id});
    console.log(user.priv)
    if (user.priv != 1){
        res.status(401).send('Access Denied')
    }
    else{
        const stock = await Stock.find();
        console.log(stock)
        res.render('shop', {stock:stock})
    }

});

router.get('/add',verify , async function(req, res, next) {
    const user = await User.findOne({ _id: req.user._id});
    console.log(user.priv)
    if (user.priv != 1){
        res.status(401).send('Access Denied')
    }
    else{
        res.render('manage_add')
    }
});

module.exports = router;