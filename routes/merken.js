/*jshint esversion: 8 */
const validateObjectId = require('../middleware/validateObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Merk, validate} = require("../models/Merk");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


//get all
router.get("/",async(req,res) =>{
    const merken=await Merk.find();
    res.send(merken);
});

//post a new merk
router.post("/",auth,(req,res)=>{
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
router.put("/:id",async(req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const merk= await Merk.findByIdAndUpdate(req.params.id,{
        Naam:req.body.Naam,
        Beschrijving:req.body.Beschrijving
    },{new:true});

});
//delete
router.delete("/:id",async(req,res)=>{
const merk= await Merk.findbyId(req.params.id);
if (!merk) return res.status(404).send('The genre with the given ID was not found.');
res.send(merk);

});

router.get(':/id',async(req,res)=>{
const merk= await Merk.findbyId(req.params.id);
if (!merk) return res.status(404).send('The genre with the given ID was not found.');
res.send(merk);
});

module.exports=router;

