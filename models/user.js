const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
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
        required:true,
        default:false
    },
    Write:{
        type:Boolean,
        required:true,
        default:false
    },
    Update:{
        type:Boolean,
        required:true,
        default:false
    },
    Delete:{
        type:Boolean,
        required:true,
        default:false
    },

    IsAdmin:{
        type:Boolean,
        required:true,
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
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;