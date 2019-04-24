/*jshint esversion: 8 */
import {Merk} from "../models/Merk";

import {Persoon} from "../models/Persoon";

import {Fles, validate} from "../models/Fles";

import validateObjectId from "../middleware/validateObjectId";



const auth = require('../middleware/auth');
const Admin = require('../middleware/roles/admin');
const Read = require('../middleware/roles/read');
const Update = require('../middleware/roles/update');
const Write = require('../middleware/roles/write');
const Delete = require('../middleware/roles/delete');




import express from "express";


const router = express.Router();



//get all
router.get("/",[auth,Read],async (req,res)=>{
const flessen= await Fles.find();
res.send(flessen);
});


router.post("/",[auth,Write],async (req,res)=>{
    const {error}=validate(req.body);
    if (error) return res.status(400).send((error.detail[0].message));
    const persoon=await Persoon.findById(req.body.PersoonId);
    const merk= await Merk.findById(req.body.MerkId);

    let fles= new Fles({

        Merk:{
            _id:merk.id,
            Naam:merk.Naam,
            Beschrijving:Merk.Beschrijving
        },
        Inhoud:req.body.Inhoud,
        Beschrijving:req.body.Beschrijving,
        Persoon:{
            _id:persoon.id,
            Naam:persoon.Naam,
        }
    })
    fles=await fles.save();
    res.send(fles);
});
router.put("/:id",[auth,Update],async (req,res)=>{
    const {error}=validate(req.body);
    if (error) return res.status(400).send((error.detail[0].message));

    const persoon=await Persoon.findById(req.body.PersoonId);
    if (!persoon) return res.send.status(404).send("niet gevonden");

    const merk= await Merk.findById(req.body.MerkId);
    if (!merk) return res.send.status(404).send("niet gevonden");

    const fles= await Fles.findByIdAndUpdate(req.params.id,{
        Merk:{
            _id:merk.id,
            Naam:merk.Naam,
            Beschrijving:Merk.Beschrijving
        },
        Inhoud:req.body.Inhoud,
        Beschrijving:req.body.Beschrijving,
        Persoon:{
            _id:persoon.id,
            Naam:persoon.Naam,
        }
    })
    if (!fles) return res.send.status(404).send("niet gevonden");

    res.send(fles);
});

router.delete(":/id",[auth,Delete],async (req,res)=>{
    const fles= await Fles.findByIdAndRemove(req.params.id);
    if (!fles) return res.send.status(404).send("niet gevonden");
    res.send(fles);
});

router.get("/:id",[auth,Read],async (req,res)=>{
   const fles= await Fles.findById(req.params.id);
    if (!fles) return res.send.status(404).send("niet gevonden");
    res.send(fles);
});

module.exports=router;


