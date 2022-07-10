const {Schema, model} = require('mongoose');
const {passwordService} = require("../services");

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 20
    },
    password: {
        type: String,
        required: true
    },

    avatar: String
}, {timestamps: true});


//METHODS
UserSchema.methods = { // for single record // THIS - RECORD
   async comparePasswords(password) {
       await passwordService.comparePassword(this.password,password)
    }
}

// STATICS
UserSchema.statics = {// for schema //THIS - SCHEMA
    createUserWithHashPassword: async function(userToSave) {
        const hashedPassword = await passwordService.hashPassword(userToSave.password);

        return this.create({...userToSave, password: hashedPassword});
    }
}

module.exports = model('user', UserSchema);

