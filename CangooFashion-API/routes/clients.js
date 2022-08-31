'use strict'

const clientController = require('../controllers/ClientController');
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticate')

api.post('/registerClients', clientController.registerClients);
api.post('/login', clientController.login);

api.get('/getClients/:type/:filter', auth.auth, clientController.getClients)
api.post('/registerClientCMS', auth.auth, clientController.registerClientCMS)
api.get('/getClientById/:id', auth.auth, clientController.getClientById)
api.put('/updateClient/:id', auth.auth, clientController.updateClient)
api.delete('/deleteClient/:id', auth.auth, clientController.deleteClient)

api.get('/getClientByIdShop/:id', auth.auth, clientController.getClientByIdShop)
api.put('/updateClientShop/:id', auth.auth, clientController.updateClientShop)

//address
api.post('/registerAddress', auth.auth, clientController.registerAddress)
api.get('/getAddress/:id', auth.auth, clientController.getAddress)
api.put('/changeAddressPrincipal/:id/:client', auth.auth, clientController.changeAddressPrincipal)
api.get('/getAddressPrincipal/:id', auth.auth, clientController.getAddressPrincipal)

/* Contacts */
api.post('/sendMessageContact', clientController.sendMessageContact)

/* Orders */
api.get('/getOrderClient/:id', auth.auth, clientController.getOrderClient)
api.get('/getOrderDetailsClient/:id', auth.auth, clientController.getOrderDetailsClient)

/* reviews */
api.post('/reviewClient', auth.auth, clientController.reviewClient)

module.exports =  api;