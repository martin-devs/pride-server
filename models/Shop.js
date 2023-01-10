//shop model
const mongoose = require('mongoose');

const ShopSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    shopKey: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('shop', ShopSchema);