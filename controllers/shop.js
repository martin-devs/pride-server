//shop controller
const ShopSchema = require('../models/Shop');

//import bcrypt
const bcrypt = require('bcryptjs');

//import jsonwebtoken
const jwt = require('jsonwebtoken');

//CREATE, UPDATE , READ ONE, RAEAD ALL, DELETE
module.exports = {
    //read all shops
    getShops: async (req, res) => {
        try {
            const shops = await ShopSchema.find();
            res.json(shops);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    //read one shop, by id
    getShop: async (req, res) => {
        try {
            const shop = await ShopSchema.findById(req.params.id);
            if (!shop) {
                return res.status(404).json({ msg: 'Shop not found' });
            }
            res.json(shop);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    },
    //create
    createShop: async (req, res) => {
        const { name, email, phone, locationName, location, shopKey } = req.body;
        try {
            let shop = await ShopSchema.findOne({ shopKey: shopKey });
            if (shop) {
                return res
                    .status(400)
                    .json({ msg: 'Shop already exists' });
            }
            shop = new ShopSchema({
                name,
                email,
                phone,
                locationName,
                location,
                shopKey

           
            });

            await shop.save();
            res.json(shop);



        }
        catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
        //update
        updateShop: async (req, res) => {
            const { name, email, phone, shopId, locationName, location, shopKey } = req.body;
            const shopFields = {};
            if (name) shopFields.name = name;
            if (email) shopFields.email = email;
            if (phone) shopFields.phone = phone;
            if (shopId) shopFields.shopId = shopId;
            if (locationName) shopFields.locationName = locationName;
            if (location) shopFields.location = location;
            if (shopKey) shopFields.shopKey = shopKey;


            try {
                let shop = await ShopSchema.findById(req.params.id);
                if (!shop) return res.status(404).json({ msg: 'Shop not found' });
                shop = await ShopSchema
                    .findByIdAndUpdate(
                        req.params.id,
                        { $set: shopFields },
                        { new: true }
                    );
                res.json(shop);
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        },
        //delete
        deleteShop: async (req, res) => {
            try {
                let shop = await ShopSchema.findById(req.params.id);
                if (!shop) return res.status(404).json({ msg: 'Shop not found' });
                await ShopSchema.findByIdAndRemove(req.params.id);
                res.json({ msg: 'Shop removed' });
            } catch (err) {
                console.error(err.message);
                res.status(500).send('Server Error');
            }
        }   ,
    
                




}

