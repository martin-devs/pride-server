//ratings controller

const Rating = require('../models/Rating.js');

module.exports = {
   create: async (req, res) => {
        const { userId, productId, rating } = req.body;
    
        try {
            let existingRating = await Rating.findOne({ userId, productId });
            if (existingRating) {
                existingRating.rating = rating;
                const updatedRating = await existingRating.save();
                res.status(200).json(updatedRating);
            } else {
                const newRating = new Rating({ userId, productId, rating });
                const savedRating = await newRating.save();
                res.status(200).json(savedRating);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    getAll: async (req, res) => {
        try {
            const ratings = await Rating.find();
            res.status(200).json(ratings);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getById: async (req, res) => {
        try {
            const rating = await Rating.findById(req.params.id);
            res.status(200).json(rating);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getByPId: async (req, res) => {
        try {
            const rating = await Rating.find({ productId: req.params.id });
            res.status(200).json(rating);
        } catch (err) {
            res.status(500).json(err);
        }
    }

}