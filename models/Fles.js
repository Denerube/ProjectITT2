const Joi=require("joi");
const mongoose=require("mongoose");
const Fles= mongoose.model("Fles",new mongoose.Schema({
    Merk:{
        type:String,
        required:true,
        minlength:3
    },
    Inhoud:{
        type:String,
        enum:["1/4",'2/4','3/4','1/4',"LEEG"],
        default:"4/4"
    },
    beschrijving:{
        type:String,
        required:false
    }


}));
