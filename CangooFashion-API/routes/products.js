'use strict'

const productController = require('../controllers/ProductController');
const express = require('express');
const api = express.Router();
const auth = require('../middlewares/authenticate')
const multiparty = require('connect-multiparty')
const path = multiparty({uploadDir: './uploads/products'})

//Productos
api.post('/registerProduct', [auth.auth, path], productController.registerProduct)
api.get('/getProduct/:filter?', auth.auth, productController.getProduct)
api.get('/getFrontPage/:img', productController.getFrontPage)
api.get('/getProductById/:id', auth.auth, productController.getProductById)
api.put('/updateProduct/:id', [auth.auth, path], productController.updateProduct)
api.delete('/deleteProduct/:id', auth.auth, productController.deleteProduct)
api.put('/updateVarieties/:id', auth.auth, productController.updateVarieties)
api.put('/addGalleryImage/:id', [auth.auth, path], productController.addGalleryImage)
api.put('/deleteGalleryImage/:id', auth.auth, productController.deleteGalleryImage)

//Inventario
api.get('/inventoryProduct/:id', auth.auth, productController.inventoryProduct)
api.delete('/deleteInventory/:id', auth.auth, productController.deleteInventory)
api.post('/registerInventary', auth.auth, productController.registerInventary)

//Public
api.get('/getProductShop/:filter?', productController.getProductShop)
api.get('/getDetailProductShop/:slug', productController.getDetailProductShop)
api.get('/getProductRecommendedShop/:category', productController.getProductRecommendedShop)
api.get('/getProductNewsShop', productController.getProductNewsShop)
api.get('/getProductMostSelledShop', productController.getProductMostSelledShop)

module.exports =  api;