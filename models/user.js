const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true,"name is required eh"],
        minlength: 5,
        maxlength: 50
    },
    Email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    Password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    Read:{
        type:Boolean,
        
        default:false
    },
    Write:{
        type:Boolean,
       
        default:false
    },
    Update:{
        type:Boolean,
        
        default:false
    },
    Delete:{
        type:Boolean,
      
        default:false
    },

    IsAdmin:{
        type:Boolean,
       
        default:false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, Read:this.Read,Write:this.Write,Update:this.Update,Delete:this.Delete,IsAdmin: this.IsAdmin }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        Name: Joi.string().min(5).max(50).required(),
        Email: Joi.string().min(5).max(255).required().email(),
        Password: Joi.string().min(5).max(255).required(),
        Read:Joi.boolean().optional(),
        Write:Joi.boolean().optional(),
        Update:Joi.boolean().optional(),
        Delete:Joi.boolean().optional(),
        IsAdmin:Joi.boolean().optional()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;