const Joi=require("joi");
const mongoose=require("mongoose");
const {PersoonSchema}= require("./Persoon");
const {FlesSchema}=require("./Fles")
const Fles= mongoose.model("Fles",new mongoose.Schema({

    flessen:{
        type:FlesSchema,
        required:true
    },
    Persoon:{
        type:Persoon,
        required:true
    },
    beschrijving:{
        type:String
    },
    Datum:{
        type:Date,
        required:true
    }

}));
