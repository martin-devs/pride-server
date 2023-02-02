//orders route
const express = require('express');
const orders = express.Router();
const  {makeOrder,
     getOrders,
        getOrdersByCustomerId,
        getOrdersByShopId
    } = require ('../controllers/orders');
// const {obtainAccessToken, mpesaExpressInt, confirmation} = require('../middleware/mpesa');


//route to get the auth token
// orders.get('/get-auth-token',obtainAccessToken);

//lipa na mpesa online 
orders.post('/makeorder', makeOrder);

//callback url
// orders.post('/mpesa/confirmation',confirmation)

orders.get('/get/all',getOrders)

//get by customerId
orders.get('/get/customerId/:id',getOrdersByCustomerId)




module.exports = orders;