const AdminSchema = require('../models/Admin');
const CustomerSchema = require('../models/Customer');
const ShopOwnerSchema = require('../models/shopOwner');

const bycrypt = require('bcryptjs');




module.exports = {
    //login
    //iterate through the three schemas and check if the email exists then verify the password

    login: async (req, res) => {
        const { email, password } = req.body;
        const validate = (user, password) => {
            const isMatch = bycrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ msg: 'Invalid Password' });
            }
            res.json(user);
        }
        try {
            let user = await CustomerSchema.findOne({ email: email
                });
            if(user){
                validate(user, password)
                return
            }
             user = await AdminSchema.findOne({ email: email
                });
            if(user){
                validate(user, password)
                return
            }
           user = await ShopOwnerSchema.findOne({ email: email
                });
            if(user){
                validate(user, password)
                return
            }
            console.log(user)
            res.status(404).json({ msg: 'user not found' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },



}
