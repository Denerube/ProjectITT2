/*jshint esversion: 8 */
const Joi=require("joi");
const mongoose=require("mongoose");
const {MerkSchema}= require("./Merk");


const FlesSchema= new mongoose.Schema({
    Merk:{
        type:MerkSchema,
        required:true,
        ref:"Merk"
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
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Persoon"
    } 
});

//const Fles = mongoose.modelNames().indexOf('Fles') < -1 ? mongoose.model('Fles', FlesSchema) : mongoose.model('Fles')
let Fles= mongoose.model('Fles', FlesSchema);

function validateFles(fles){
    const schema={
        MerkId:Joi.objectId(),
        Inhoud:Joi.string().valid("1/4",'2/4','3/4',"LEEG"),
        Beschrijving:Joi.string(),
        PersoonId:Joi.objectId()
    };
    return Joi.validate(fles,schema);
}
exports.Fles=Fles;
exports.validate=validateFles;
exports.FlesSchema=FlesSchema;

