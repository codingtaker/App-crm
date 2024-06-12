const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Veuillez entrer votre nom!'],
    },
    email:{
        type: String,
        required: [true,'Veuillez entrer un email valide !'],
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    
    created_at: {
        type: String
    },
    role:{
        type: String,
        enum: ["customers", "admin"],
        defaultValue: "admin"
    }
});

userSchema.plugin(uniqueValidator);
const user = new mongoose.model('User', userSchema);

module.exports = user;