var express = require('express');
const Stock = require('../models/stock');
const Purchase = require('../models/purchase');
const User = require('../models/users');
const verify = require('./verifyToken');
var router = express.Router();

router.get('/',verify , async function(req, res, next) {
	console.log(req.user)
	const stock = await Stock.find();
	console.log(stock)
	res.render('shop', {stock:stock}) //直接傳給view
});


router.post('/findItem',verify , async function(req, res, next) {
	console.log(req.user)
	const stock = await Stock.findOne({_id:req.body.stock_id});
	console.log(stock)
	res.status(200).send(stock)
});

router.post('/purchaseItem',verify , async function(req, res, next) {
    const stock = await Stock.findOne({_id:req.body.stock_id});
	const user_id = req.user._id
    const stock_id = req.body.stock_id
    const amount = req.body.amount
    // 檢查是不是負數？
    if (amount > stock['left_amount']) {
        res.status(400).send('Purchase amount bigger than left amount')
    }
    else {
        new_left_amount = stock['left_amount'] - amount
        await Stock.updateOne({_id:stock_id}, { $set: { left_amount: new_left_amount } });
        const purchase = new Purchase({
            user_id: user_id,
            stock_id: stock_id,
            amount: amount
        })
        
        try {
            const applyPurchase = await purchase.save();
            res.status(200).send(applyPurchase)
        }catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
});

router.get('/purchaseList',verify , async function(req, res, next) {
    const result = await Purchase.find({user_id:req.user._id});
    console.log(result)
    return_list = []
    for (let i = 0 ; i < result.length ; i++){
        const stock =  await Stock.findOne({_id: result[i]['stock_id']});
        console.log(stock)
        single_record = {stock_id: result[i]['stock_id'], amount:result[i]['amount'], stock_title: stock['title'], stock_price: stock['price']};
        console.log(single_record)
        return_list.push(single_record);
        console.log(return_list)
    }
	res.render('purchaseList',{list:return_list}) //直接render
});

router.post('/', verify, async function(req, res) {
    const user = await User.findOne({ _id: req.user._id});

    console.log(user.priv)
    if (user.priv != 1){
        res.status(401).send('Access Denied')
    }
    else{
        const stock = new Stock({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            amount: req.body.amount,
            left_amount: req.body.amount,
            picture: req.body.picture
        });

        try {
            const saveStock = await stock.save();
            res.status(200).send(saveStock)
        }catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
});

module.exports = router;