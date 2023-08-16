const mongoose = require('mongoose')
const Schema = mongoose.Schema
const BuySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
     zip: {
        type: String,
        required: true
    },
    cardholdername: {
        type: String,
        required: false
    },
    card: {
        type: String,
        required: false
    },
    expmonth: {
        type: String,
        required: false
    },
    expyear: {
        type: String,
        required: false
    },
    cvv: {
        type: String,
        required: false
    },
    cod: {
        type: String,
        required: false
    },
    UPI: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: true
    },
   
}, { timestamps: true })
const BuyModel = new mongoose.model('buyNow', BuySchema);
module.exports = BuyModel;