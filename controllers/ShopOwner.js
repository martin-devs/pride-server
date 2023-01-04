//shop owner controller
const ShopOwnerSchema = require('../models/shopOwner');

//import bcrypt
const bcrypt = require('bcryptjs');

//import jsonwebtoken
const jwt = require('jsonwebtoken');

//import config
const config = require('config');

//import express validator

const { check, validationResult } = require('express-validator');

//controllers for admin, shopOwner and customer

module.exports = {
    //shopOwner controllers
    getShopOwners: async (req, res) => {
        try {
            const shopOwners = await ShopOwnerSchema.find();
            res.json(shopOwners);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    getShopOwner: async (req, res) => {
        try {
            const shopOwner = await ShopOwnerSchema.findById(req.params.id);
            if (!shopOwner) {
                return res.status(404).json({ msg: 'Shop Owner not found' });
            }
            res.json(shopOwner);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    createShopOwner: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, password, role } = req.body;
        try {
            let shopOwner = await ShopOwnerSchema.findOne({
                email: email
            });
            if (shopOwner) {
                return res
                    .status(400)
                    .json({ msg: 'Shop Owner already exists' });
            }
            shopOwner = new ShopOwnerSchema({
                name,
                email,
                phone,
                password,
                role
            });
            const salt = await bcrypt.genSalt(10);
            shopOwner.password = await bcrypt.hash(password, salt);
            await shopOwner.save();
            const payload = {
                shopOwner: {
                    id: shopOwner.id
                }
            };
            jwt.sign(
                payload,
                config.get('jwtSecret'),
                {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    updateShopOwner: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, password, role } = req.body;
        const shopOwnerFields = {};
        if (name) shopOwnerFields.name = name;
        if (email) shopOwnerFields.email = email;
        if (phone) shopOwnerFields.phone = phone;
        if (password) shopOwnerFields.password = password;
        if (role) shopOwnerFields.role = role;
        try {
            let shopOwner = await ShopOwnerSchema.findById(req.params.id);
            if (!shopOwner) {
                return res.status(404).json({ msg: 'Shop Owner not found' });
            }
            shopOwner = await ShopOwnerSchema.findByIdAndUpdate(
                req.params.id,
                { $set: shopOwnerFields },
                { new: true }
            );
            res.json(shopOwner);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
};


