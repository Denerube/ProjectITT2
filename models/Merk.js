const Joi=require("joi");
const mongoose=require("mongoose");
const Merk= mongoose.model("Fles",new mongoose.Schema({
    Naam:{
        type:String,
        required:true,
        minlength:3
    },
    beschrijving:{
        type:String,
        required:false
    }


}));
