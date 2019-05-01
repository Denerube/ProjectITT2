/*jshint esversion: 6 */
//const validateObjectId = require('../middleware/validateObjectId');


const {Persoon, validate} = require('../models/Persoon');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Admin = require('../middleware/roles/admin');
const Read = require('../middleware/roles/read');
const Update = require('../middleware/roles/update');
const Write = require('../middleware/roles/write');
const Delete = require('../middleware/roles/delete');
const _ = require('lodash');
//get all
router.get("/",[auth,Read],async(req,res)=>{
   const personen=await Persoon.find();
   res.send(personen);
});

//post new persoon
router.post("/",[auth,Write],async(req,res)=>{
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let persoon;
    if (req.body.Flessen==null){persoon = new Persoon({
        Naam:req.body.Naam,
        Beschrijving:req.body.Beschrijving,
        Flessen:null
    });
    }else{        
         persoon = new Persoon({
            Naam:req.body.Naam,
            Beschrijving:req.body.Beschrijving,
            Flessen:req.body.Flessen
        });
    }
    await persoon.save();
    res.send(persoon);

});

//edit persoon
router.put("/:id",[auth,Update],async(req,res)=>{
    console.log("put personen");
    //voor het moment geef je een volledige persoon mee (+ flessen) 
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    //const flessen = await Flessen.findById(req.body.flessen.id);
    
    let persoon;
    try{
    persoon= await Persoon.findByIdAndUpdate(req.params.id,{
        Naam:req.body.Naam,
        Beschrijving:req.body.Beschrijving,
        Flessen:req.body.Flessen
    },{new: true});
    if (!persoon) return res.status(404).send("nie gevonden");
    }catch(err){
        console.log(err);
    }

    res.send(persoon);

});
//delete persoon
//alle flessen worden ook verwijderd,personen worden enkel verwijderd bepaalde gevallen
router.delete("/",[auth,Admin],async (req,res)=>{
    const persoon=await  Persoon.findByIdAndRemove(req.query.id);
    if (!persoon) return res.status(404).send("nie gevonden");
    res.send(persoon);
});
//get by ID
router.get("/getById",[auth,Read],async (req,res)=>{
    const persoon= await Persoon.findById(req.query.id);
    if (!persoon) return res.status(404).send("nie gevonden");
    res.send(persoon);
});

module.exports= router;