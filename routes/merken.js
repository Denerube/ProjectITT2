/*jshint esversion: 8 */
const validateObjectId = require('../middleware/valideteObjectId');
const auth = require('../middleware/auth');
const admin = require('../middleware/roles/admin');
const {Merk, validate} = require("../models/Merk");
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Admin = require('../middleware/roles/admin');
const Read = require('../middleware/roles/read');
const Update = require('../middleware/roles/update');
const Write = require('../middleware/roles/write');
const Delete = require('../middleware/roles/delete');
const _ = require('lodash');


//get all
router.get("/",[auth,Read],async(req,res) =>{
    console.log("getting all merken");
    const merken=await Merk.find();
    res.send(merken);
});

//post a new merk
router.post("/",[auth,Write],async (req,res)=>{
    console.log(req.body);
    const {error} = validate(req.body);
    
    if (error) return res.status(400).send("verificatie error:"+error.details[0].message);

    let merk = new Merk({
        Naam:req.body.Naam,
        Beschrijving:req.body.Beschrijving
    });
    
    await merk.save();

    res.send(merk);

});

//update
router.put("/:id",[auth,Update],async(req,res)=>{
    console.log("put request merken");
    console.log(req.body);
    const {error}= validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
   
    let merk;
    try {
         merk= await Merk.findByIdAndUpdate(req.params.id,{
            Naam:req.body.Naam,
            Beschrijving:req.body.Beschrijving
        },{new:true}); 
    } catch (err) {
        console.log(err);
    }
    if (!merk) return res.status(404).send('The genre with the given ID was not found.');

    res.send(merk);
    
   

});
//delete
router.delete("/",[auth,Delete],async(req,res)=>{
const merk= await Merk.findByIdAndRemove(req.query.id);
if (!merk) return res.status(404).send('The genre with the given ID was not found.');
res.send(merk);

});

router.get('/getById',[auth,Read],async(req,res)=>{
console.log("getting by id merken");
console.log(req.query.id);
let merk
try {
    merk= await Merk.findById(req.query.id);
    
} catch (error) {
    console.log(error);
}
 

if (!merk) return res.status(404).send('The genre with the given ID was not found.');
res.send(merk);
});

module.exports=router;

