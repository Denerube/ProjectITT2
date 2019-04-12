const Joi=require("joi");
const mongoose=require("mongoose");
const {MerkSchema}= require("./Merk");

const Fles= mongoose.model("Fles",new mongoose.Schema({

    Merk:{
        type:MerkSchema,
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
function validateFles(fles){
    const schema={
        merkId:Joi.objectId(),
        Inhoud:Joi.string().valid("1/4",'2/4','3/4','1/4',"LEEG"),
        beschrijving:Joi.string()
    }
    return Joi.validate(fles,schema);
}
exports.Merk=Merk;
exports.validate=validateMerk;

