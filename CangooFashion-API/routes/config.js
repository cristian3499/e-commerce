'use strict'

const ConfigController = require('../controllers/ConfigController');
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticate')
const multiparty = require('connect-multiparty')
const path = multiparty({uploadDir: './uploads/configs'})

api.put('/updateConfig/:id', [auth.auth, path], ConfigController.updateConfig)
api.get('/getConfig', auth.auth, ConfigController.getConfig)
api.get('/getLogo/:img', ConfigController.getLogo)
api.get('/getConfigPublic', ConfigController.getConfigPublic)

module.exports =  api;