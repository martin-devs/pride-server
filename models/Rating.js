//rating schema

const mongoose = require('mongoose');

const RatingSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
    }
});

module.exports = mongoose.model('Rating', RatingSchema);