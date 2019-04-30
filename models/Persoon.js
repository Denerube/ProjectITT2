/*jshint esversion: 8 */
const Joi=require("joi");
const mongoose=require("mongoose");
const {FlesSchema} = require("./Fles");
const PersoonSchema= new mongoose.Schema({
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
        type:[FlesSchema],

    }
});
const Persoon= mongoose.model("Persoon",PersoonSchema);

function validatePersoon (persoon){
    const schema={
        Naam:Joi.string().required(),
        Beschrijving:Joi.string(),
        Flessen:Joi.array()
    }
    return Joi.validate(persoon,schema);
}

exports.Persoon=Persoon;
exports.validate=validatePersoon;
exports.PersoonSchema=PersoonSchema;
