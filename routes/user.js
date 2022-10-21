const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const express = require('express');
const User = require('../models/users');
const router = express.Router();

router.get('/register', async function(req, res, next) {
  res.render('register');
});

router.post('/register', async function(req, res, next) {
    const emailExist = await User.findOne({email: req.body.email});
    const usernameExist = await User.findOne({username: req.body.username});
    if (emailExist || usernameExist) {
        return res.status(400).send('Email or Username Already Exist')
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
		username: req.body.username,
		password: hashPassword,
        email: req.body.email,
        priv: 0
	});

    try {
        const saveUser = await user.save();
        res.status(200).send(saveUser)
    }catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
});

router.get('/login', async function(req, res, next) {
    res.render('login');
  });

router.post('/login', async function(req, res) {
    const user = await User.findOne({ username: req.body.username});
    if (user){
        const validPass = await bcrypt.compare(req.body.password, user.password);
        console.log(validPass)
        if (!validPass) {
            res.status(400).send('Username or Password is Incorrect');
        }
        const token = jwt.sign({_id: user._id, priv: user.priv}, process.env.TOKEN_SECRET);
        console.log(token)
        res.cookie('authorization', token)
        res.status(200).send('success')
    }
    else{
        res.status(400).send('Username or Password is Incorrect');
    }
	
});

router.get('/logout', function(req, res) {
	res.clearCookie('authorization');
	res.render('index');
});

module.exports = router;