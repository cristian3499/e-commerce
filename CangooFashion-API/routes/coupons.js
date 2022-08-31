'use strict'

const CouponsController = require('../controllers/CouponsController');
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticate')

api.get('/getCoupons', auth.auth, CouponsController.getCoupons)
api.post('/registerCoupon/:filter?', auth.auth, CouponsController.registerCoupon)
api.get('/getCouponById/:id', auth.auth, CouponsController.getCouponById)
api.put('/updateCoupon/:id', auth.auth, CouponsController.updateCoupon)
api.delete('/deleteCoupon/:id', auth.auth, CouponsController.deleteCoupon)

module.exports =  api;