const {Order} = require('../models');
const {validationResult} = require('express-validator');

module.exports = {
    getOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (err) {
            res.json({ message: err });
        }
    },
    getOrder: async (req, res) => {
        try {
            const order = await Order.findById(req.params.id);
            res.json(order);
        } catch (err) {
            res.json({ message: err });
        }
    }
    ,
    createOrder: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {customer_id, products, count, subTotal, shipping, total, status} = req.body;
        try {
            let order = new Order({
                customer_id,
                products,
                count,
                subTotal,
                shipping,
                total,
                status
            });
            await order.save();
            res.json(order);
        } catch (err) {
            res.status(500).send('Server error');
        }
    }
    ,
    updateOrder: async (req, res) => {
        try {
            const updatedOrder = await Order
                .updateOne(
                    { _id: req.params.id },
                    {
                        $set: {
                            status: req.body.status
                        }
                    }
                );
            res.json(updatedOrder);
        } catch (err) {
            res.json({ message: err });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            const removedOrder = await Order.remove({ _id: req.params.id });
            res.json(removedOrder);
        } catch (err) {
            res.json({ message: err });
        }
    },
    getOrdersByCustomer: (req, res) => {
        try{
            Order.find({customer_id: req.params.id}).then(orders => {
                if(!orders){
                    return res.status(404).json({msg: 'Orders not found'});
                }
                res.json(orders);
            })
        }catch (err) {
            res.json({ message: err });
        
        }
    }
};
