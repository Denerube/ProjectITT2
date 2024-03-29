/*jshint esversion: 8 */
const {Merk} =require("../models/Merk");
const {Persoon} = require("../models/Persoon");
const {Fles,validate}=require("../models/Fles");

//const validateObjectId = require("../middleware/valideteObjectId");


const auth = require('../middleware/auth');
const Admin = require('../middleware/roles/admin');
const Read = require('../middleware/roles/read');
const Update = require('../middleware/roles/update');
const Write = require('../middleware/roles/write');
const Delete = require('../middleware/roles/delete');
const express= require("express");
const router = express.Router();

//get all
router.get("/",[auth,Read],async (req,res)=>{

let flessen;
try{
flessen=await Fles.find();
}catch(error){
    console.log(error);
}
res.send(flessen);
});


router.post("/",[auth,Write],async (req,res)=>{
    const {error}=validate(req.body);
    if (error) return res.status(400).send("ver error"+error.detail[0].message);
    console.log("post new fles");
    
    let persoon,merk;
    try {
         persoon = await Persoon.findById(req.body.PersoonId);
         merk= await Merk.findById(req.body.MerkId);
    } catch (err) {
        console.log("lookup fout"+err);
    }
    
    
    let fles;
    if (!persoon){
        return res.status(400).send("persoon niet gevonden");
    }else if(!merk){
        return res.status(400).send("merk niet gevonden");
    }
    console.log(persoon);
    console.log(merk);
    fles= new Fles({

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
    });
    
    try {
        
        fles=await fles.save();
    } catch (err) {
        console.log(err);
    }
   
    
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

router.delete("/",[auth,Delete],async (req,res)=>{
    const fles= await Fles.findByIdAndRemove(req.query.id);
    if (!fles) return res.send.status(404).send("niet gevonden");
    res.send(fles);
});

router.get("/getById",[auth,Read],async (req,res)=>{
   const fles= await Fles.findById(req.query.id);
   console.log(req.params.id);
    if (!fles) return res.send.status(404).send("niet gevonden");
    res.send(fles);
});

module.exports=router;


