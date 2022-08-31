'use strict'

const adminController = require('../controllers/AdminController');
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticate')

api.post('/registerAdmins', adminController.registerAdmins);
api.post('/loginAdmin', adminController.loginAdmin);
api.get('/getMessage', auth.auth, adminController.getMessage);
api.put('/changeStatusMessage/:id', auth.auth, adminController.changeStatusMessage);
api.get('/salesHistory/:desde?/:hasta?', auth.auth, adminController.salesHistory);
api.get('/monthlyKpi', auth.auth, adminController.monthlyKpi);

module.exports =  api;