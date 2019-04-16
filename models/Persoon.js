/*jshint esversion: 8 */
const Joi=require("joi");
const mongoose=require("mongoose");
const flessenSchema= require("./Fles");
const Persoon= mongoose.model("Fles",new mongoose.Schema({
    Naam:{
        type:String,
        required:true,
        minlength:3
    },
    Beschrijving:{
        type:String,
        required:false
    },
    Flessen:{
        type:[flessenSchema],

    }


}));

function validatePersoon (persoon){
    const schema={
        Naam:Joi.string().required(),
        beschrijving:Joi.string(),
        Flessen:Joi.array()
    }
    return Joi.validate(persoon,schema);
}

exports.Persoon=Persoon;
exports.validate=validatePersoon;