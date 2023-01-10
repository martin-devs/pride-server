//shop routes
const express = require('express');

const router = express.Router();

const { getShops, getShop, createShop, updateShop, deleteShop } = require('../controllers/shop');


router.post('/',createShop);
router.get('/',getShops);
router.get('/:id',getShop);
router.put('/:id',updateShop);
router.delete('/:id',deleteShop);

module.exports = router;

