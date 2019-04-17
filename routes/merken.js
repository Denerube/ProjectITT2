/*jshint esversion: 8 */
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/roles/admin');
const {Merk, validate} = require("../models/Merk");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Admin = require('../middleware/roles/admin');
const Read = require('../middleware/roles/read');
const Update = require('../middleware/roles/update');
const Write = require('../middleware/roles/write');
const Delete = require('../middleware/roles/delete');

//get all
router.get("/",[auth,Read],async(req,res) =>{
    const merken=await Merk.find();
    res.send(merken);
});

//post a new merk
router.post("/",[auth,Write],(req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let merk = new Merk({
        Naam:req.body.Naam,
        Beschrijving:req.body.Beschrijving
    });
    let genre = await.genre.save();
    res.send(merk);

});

//update
router.put("/:id",[auth,Update],async(req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const merk= await Merk.findByIdAndUpdate(req.params.id,{
        Naam:req.body.Naam,
        Beschrijving:req.body.Beschrijving
    },{new:true});

});
//delete
router.delete("/:id",[auth,Delete],async(req,res)=>{
const merk= await Merk.findbyId(req.params.id);
if (!merk) return res.status(404).send('The genre with the given ID was not found.');
res.send(merk);

});

router.get(':/id',[auth,Read],async(req,res)=>{
const merk= await Merk.findbyId(req.params.id);
if (!merk) return res.status(404).send('The genre with the given ID was not found.');
res.send(merk);
});

module.exports=router;

