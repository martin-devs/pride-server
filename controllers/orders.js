const { connectDB } = require("../config/config");
const MpesaApi = require("../lib/mpesa");
const Order = require("../models/Order");
const products = require("./products");

module.exports = {
    makeOrder: async (req, res) => {
        const mpesaApi = new MpesaApi();
        const {
            customer_id,
            name,
            email,
            phone,
            products,
            count,
            shipping,
            total,
            subTotal,
        } = req.body;
        try {
            let result = await Order.create({
                customer_id: customer_id,
                name: name,
                email: email,
                phone: phone,
                products: products,
                count: count,
                subTotal: subTotal,
                shipping: shipping,
                total: total,
                payment: {
                    status: "pending", // pending, processing, success, cancelled
                    MerchantRequestID: "",
                    CheckoutRequestID: "",
                },
            });

            const token = await mpesaApi.getOAuthToken();

            const options = {
                sender: "254700207054",
                amount: 1,
                reference: "Order Payment - Pride",
                description: "Payment for order",
                shortCode: "174379",
                callbackUrl:
                    "https://small-years-march-41-72-216-66.loca.lt/payment/mpesa/hook",
            };

            const data = await mpesaApi.lipaNaMpesaOnline(token, options);

            result = await Order.findByIdAndUpdate(
                result?._id,
                {
                    payment: {
                        status: "processing",
                        MerchantRequestID: data?.data
                            ? data?.data?.MerchantRequestID
                            : data?.MerchantRequestID,
                        CheckoutRequestID: data?.data
                            ? data?.data?.CheckoutRequestID
                            : data?.CheckoutRequestID,
                    },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log(err);
        }
    },
    getOrders: async (req, res) => {
        try {
            const result = await Order.find();
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log(err);
        }
    },
    getOrdersByCustomerId: async (req, res) => {
        try {
            const result = await Order.find({ customer_id: req.params.id });
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
            console.log(err);
        }
    },
};
