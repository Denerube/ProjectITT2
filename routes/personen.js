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
    res.send(persoon);

});

//edit persoon
router.post("/",[auth,Update],async(req,res)=>{
    //voor het moment geef je een volledige persoon mee (+ flessen) tot beter oplossing gevonden is
    const {error} = validate(req.body);
    //const flessen = await Flessen.findById(req.body.flessen.id);
    const persoon= await Persoon.findByIdAndUpdate(req.params.id,{
        Naam:req.body.Naam,
        Beschrijving:req.body.Beschrijving,
        Flessen:req.body.Flessen
    },{new: true});
    if (!persoon) return res.status(404).send("nie gevonden");
    res.send(persoon);

});
//delete persoon
//alle flessen worden ook verwijderd,personen worden enkel verwijderd bepaalde gevallen
router.delete(":/id",[auth,Admin],async (req,res)=>{
    const persoon=await  Persoon.findByIdAndRemove(req.params.id);
    if (!persoon) return res.status(404).send("nie gevonden");
    res.send(persoon);
});
//get by ID
router.get(":/id",[auth,Read],async (req,res)=>{
    const persoon= await Persoon.findById(req.params.id);
    if (!persoon) return res.status(404).send("nie gevonden");
    res.send(persoon);
});

module.exports= router;