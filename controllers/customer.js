//customer contollers
const CustomerSchema = require('../models/Customer');

//import bcrypt
const bcrypt = require('bcryptjs');

//import jsonwebtoken
const jwt = require('jsonwebtoken');


//controllers for customer

module.exports = {
    //read all customers
    getCustomers: async (req, res) => {
        try {
            const customers = await CustomerSchema.find();
            res.json(customers);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    //read one customer, by id
    getCustomer: async (req, res) => {
        try {
            const customer = await CustomerSchema.findById(req.params.id);
            if (!customer) {
                return res.status(404).json({ msg: 'Customer not found' });
            }
            res.json(customer);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    //create
    createCustomer: async (req, res) => {
        const { name, email, phone, password,  deliveryLocation, mpesaNumber } = req.body;
        console.log(req.body)
        try {
            let customer = await CustomerSchema.findOne({ email: email
                });
            if (customer) {
                return res.status(400).json({ msg: 'Customer already exists' });
            }
            customer = new CustomerSchema({
                name,
                email,
                phone,
                password,
                deliveryLocation,
                mpesaNumber,

            });
            const salt = await bcrypt.genSalt(10);
            customer.password = await bcrypt.hash(password, salt);
            await customer.save();
            res.json(customer);
         /*

            const payload = {
                customer: {
                    id: customer.id,
                    role: customer.role,
                    name: customer.name,
                    email: customer.email,
                    phone: customer.phone,
                    password: customer.password
                }

            };
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
            );
            */
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    },
    //update
    updateCustomer: async (req, res) => {
        const { name, email, phone, password, role, skincode } = req.body;
        //build customer object
        const customerFields = {};
        if (name) customerFields.name = name;
        if (email) customerFields.email = email;
        if (phone) customerFields.phone = phone;
        if (password) customerFields.password = password;
        if (role) customerFields.role = role;
        if (skincode) customerFields.skincode = skincode;

        try {
            let customer = await CustomerSchema.findById(req.params.id);
            if (!customer) return res.status(404).json({ msg: 'Customer not found' });
            //update
            customer = await CustomerSchema.findByIdAndUpdate(req.params.id, { $set: customerFields }, { new: true });
            res.json(customer);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },
    //delete
    deleteCustomer: async (req, res) => {
        try {
            let customer = await CustomerSchema.findById(req.params.id);
            if (!customer) return res.status(404).json({ msg: 'Customer not found' });
            await CustomerSchema.findByIdAndRemove(req.params.id);
            res.json({ msg: 'Customer removed' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },


}

