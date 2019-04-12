const Joi=require("joi");
const mongoose=require("mongoose");
const Merk= mongoose.model("Fles",new mongoose.Schema({
    Naam:{
        type:String,
        required:true,
        minlength:3
    },
    Beschrijving:{
        type:String,
        required:false
    }


}));

function validateMerk(merk){
    const schema={
        name:Joi.string().required(),
        Beschrijving:Joi.string()
    }
    return Joi.validate(merk,schema);
}
exports.Merk=Merk;
exports.validate=validateMerk;