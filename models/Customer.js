//customer model
const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    deliveryLocation : {
        type: String,
        required: true
    },
    mpesaNumber : {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    skincode: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Customer', CustomerSchema);
