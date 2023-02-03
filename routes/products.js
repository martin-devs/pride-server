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
    getProductsPageLimit,
    searchProduct,
    getProductByCode,
    searchProductByCategory,
    getProductsByCode
} = require('../controllers/products');

//routes

router.get('/', getProducts);

router.get('/:id', getProduct);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

//get by page and limit
router.get('/page/:page/limit/:limit', getProductsPageLimit);

//search product
router.get('/search/:query', searchProduct);

//search by category
router.get('/category/:category/:query', searchProductByCategory);

//find by code
router.get('/code/:code', getProductByCode);


router.get('/code/:code', getProductsByCode);




module.exports = router;