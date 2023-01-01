//products model

const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    identifier: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    shop_id:  {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
