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
        default: 'Nairobi'
    },
    mpesaNumber : {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'CUSTOMER'
    },
    skincode: {
        type: String,
        default:''
        
    },
});

module.exports = mongoose.model('Customer', CustomerSchema);
