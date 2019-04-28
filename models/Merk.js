/*jshint esversion: 8 */
const Joi=require("joi");
const mongoose=require("mongoose");
const MerkSchema= new mongoose.Schema({
    Naam:{
        type:String,
        required:[true,"name is required"],
        minlength:3
    },
    Beschrijving:{
        type:String,
        required:false
    }


});

const Merk= mongoose.model("Fles",MerkSchema);

function validateMerk(merk){
    const schema={
        Naam:Joi.string().required(),
        Beschrijving:Joi.string()
    }
    return Joi.validate(merk,schema);
}
exports.Merk=Merk;
exports.MerkSchema=MerkSchema;
exports.validate=validateMerk;