const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ContactSchema = new Schema({
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
    message: {
        type: String,
        required: true
    }
}, { timestamps: true })
const ContactModel = new mongoose.model('contact', ContactSchema);
module.exports = ContactModel;