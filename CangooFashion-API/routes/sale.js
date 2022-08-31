'use strict'

const SaleController = require('../controllers/SaleController');
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticate')

api.post('/RegisterSale', auth.auth, SaleController.RegisterSale)
api.get('/sendEmail/:id', auth.auth, SaleController.sendEmail)

module.exports =  api;