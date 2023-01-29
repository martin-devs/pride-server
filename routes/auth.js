const express = require('express');

const auth = express.Router();

const {login}= require('../controllers/auth');

auth.post('/login', login);

module.exports = auth;