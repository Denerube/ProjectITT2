/*jshint esversion: 8 */
const Joi=require("joi");
const mongoose=require("mongoose");
const {MerkSchema}= require("./Merk");
const {PersoonSchema}=require("./Persoon");

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
    Beschrijving:{
        type:String,
        required:false
    },
    Persoon:{
        type:Schema.type.objectId,
        required:true,
        ref:"Persoon"
    }


}));
function validateFles(fles){
    const schema={
        MerkId:Joi.objectId(),
        Inhoud:Joi.string().valid("1/4",'2/4','3/4','1/4',"LEEG"),
        Beschrijving:Joi.string(),
        PersoonId:Joi.objectId()
    }
    return Joi.validate(fles,schema);
}
exports.Fles=Fles;
exports.validate=validateFles;

