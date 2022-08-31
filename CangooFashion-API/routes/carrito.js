'use strict'

const carritoController = require('../controllers/CarritoController');
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticate')

api.post('/addCart', auth.auth, carritoController.addCart);
api.get('/getClientCar/:id', auth.auth, carritoController.getClientCar);
api.delete('/deleteClientCar/:id', auth.auth, carritoController.deleteClientCar);


module.exports =  api;