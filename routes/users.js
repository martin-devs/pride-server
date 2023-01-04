//products route
const express = require('express');
const router = express.Router();

//admin
router.post('/admin', createAdmin);
router.get('/admin', getAdmins);
router.get('/admin/:id', getAdmin);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);

//customer
router.post('/customer', createCustomer);
router.get('/customer', getCustomers);
router.get('/customer/:id', getCustomer);
router.put('/customer/:id', updateCustomer);
router.delete('/customer/:id', deleteCustomer);

//shopOwner
router.post('/shopOwner', createShopOwner);
router.get('/shopOwner', getShopOwners);
router.get('/shopOwner/:id', getShopOwner);
router.put('/shopOwner/:id', updateShopOwner);
router.delete('/shopOwner/:id', deleteShopOwner);
