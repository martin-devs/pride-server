//import schemas for users
const AdminSchema = require('../models/Admin');
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
    //admin controllers
    getAdmins: async (req, res) => {
        try {
            const admins = await AdminSchema.find();
            res.json(admins);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    getAdmin: async (req, res) => {
        try {
            const admin = await AdminSchema.findById(req.params.id);
            if (!admin) {
                return res.status(404).json({ msg: 'Admin not found' });
            }
            res.json(admin);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    createAdmin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone, password, role } = req.body;
        try {
            let admin = await AdminSchema.findOne({ email: email });
            if (admin) {
                return res.status(400).json({ msg: 'Admin already exists' });
            }
            admin = new AdminSchema({
                name,
                email,
                phone,
                password,
                role
            });
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);
            await admin.save();
            const payload = {
                admin: {
                    id: admin.id
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
    updateAdmin: async (req, res) => {
        const { name, email, phone, password, role } = req.body;
        const adminFields = {};
        if (name) adminFields.name = name;
        if (email) adminFields.email = email;
        if (phone) adminFields.phone = phone;
        if (password) adminFields.password = password;
        if (role) adminFields.role = role;
        try {
            let admin = await AdminSchema.findById(req.params.id);
            if (!admin) {
                return res.status(404).json({ msg: 'Admin not found' });
            }
            admin = await AdminSchema.findByIdAndUpdate(
                req.params.id,
                { $set: adminFields
                },
                { new: true }
            );
            res.json(admin);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    deleteAdmin: async (req, res) => {
        try {
            let admin = await AdminSchema.findById(req.params.id);
            if (!admin) {
                return res.status(404).json({ msg: 'Admin not found' });
            }
            await AdminSchema.findByIdAndRemove(req.params.id);
            res.json({ msg: 'Admin removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
};
