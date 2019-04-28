
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Admin = require('../middleware/roles/admin');
const Read = require('../middleware/roles/read');
const Update = require('../middleware/roles/update');
const Write = require('../middleware/roles/write');
const Delete = require('../middleware/roles/delete');

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});
//get all
router.get("/",async (req,res)=>{
    const users= await User.find();
    res.send(users);
    });

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("validatie error"+error.details[0].message);

    let user = await User.findOne({ Email: req.body.Email });
    if (user) return res.status(400).send('User already registered.');

    user = new User({
        Name:req.body.Name,
        Email:req.body.Email,
        Password:req.body.Password,
        Read:req.body.Read,
        Write:req.body.Write,
        Update:req.body.Update,
        Delete:req.body.Delete,
        IsAdmin:req.body.IsAdmin
    });
    const salt = await bcrypt.genSalt(10);
    user.Password = await bcrypt.hash(user.Password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'Name', 'Email']));
});

module.exports = router;
