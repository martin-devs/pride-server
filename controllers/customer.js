//customer contollers
const CustomerSchema = require('../models/customer');

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
    //customer controllers
    getCustomers: async (req, res) => {
        try {
            const customers = await CustomerSchema.find();
            res.json(customers);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
}

