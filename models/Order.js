//order model
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products:{
        type: Array,
        required: true
    },
    count: {
        type: Number,
        required: true
    },
    subTotal: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    },

    })

module.exports = Order = mongoose.model('order', OrderSchema);