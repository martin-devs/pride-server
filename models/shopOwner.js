//shop owner model
const mongoose = require('mongoose');

const ShopOwnerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
    shopName: {
        type: String,
        required: true
    },
    shopId: {
        type: String,
        required: true
    },
    role : {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ShopOwner', ShopOwnerSchema);
