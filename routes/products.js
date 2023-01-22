//products route
const express = require('express');
const router = express.Router();

// Require controllers from ../controllers/products.js

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsPageLimit
} = require('../controllers/products');

//routes

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

//get by page and limit
router.get('/page/:page/limit/:limit', getProductsPageLimit);


module.exports = router;