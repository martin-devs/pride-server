const AdminSchema = require('../models/Admin');
const CustomerSchema = require('../models/Customer');
const ShopOwnerSchema = require('../models/shopOwner');

const bycrypt = require('bcryptjs');




module.exports = {
    //login
    //iterate through the three schemas and check if the email exists then verify the password

    login: async (req, res) => {
        const { email, password } = req.body;
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
                validate(userm, password)
                return
            }
            res.status(400).json({ msg: 'Invalid Credentials' });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    },



}
const validate = (user, password) => {
    const isMatch = bycrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
    }
    res.json(user);
}