const Joi=require("joi");
const mongoose=require("mongoose");
const flessenSchema= require("./Fles");
const Merk= mongoose.model("Fles",new mongoose.Schema({
    Naam:{
        type:String,
        required:true,
        minlength:3
    },
    beschrijving:{
        type:String,
        required:false
    },
    flessen:{
        type:[flessenSchema],

    }


}));

function validatePersoon (persoon){
    const schema={
        Naam:Joi.string().required(),
        beschrijving:Joi.string(),
        flessen:Joi.array()
    }
    return Joi.validate(persoon,schema);
}

