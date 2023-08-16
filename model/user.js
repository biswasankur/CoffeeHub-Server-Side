const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    isAdmin:{
        type:Boolean,
        default:false
      },
   
}, { timestamps: true })
const UserModel = new mongoose.model('user', UserSchema);
module.exports = UserModel;