const mongoose = require('mongoose')
const Schema = mongoose.Schema
const coffeeItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    itemDetails: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })
const itemModel = new mongoose.model('CoffeeItem', coffeeItemSchema);
module.exports = itemModel;