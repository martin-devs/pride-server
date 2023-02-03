//ratings route

const express = require('express');

const router = express.Router();

const { create, 
    getAll,
     getById, 
     getByPId } = require('../controllers/ratings');


router.post('/', create)

router.get('/', getAll)

router.get('/:id', getById)

//by user id

//by product id

router.get('/pid/:id', getByPId)

module.exports = router;