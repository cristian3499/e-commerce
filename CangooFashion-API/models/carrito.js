'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = Schema({
    product: {type: Schema.ObjectId, ref: 'products', require: true},
    client: {type: Schema.ObjectId, ref: 'clients', require: true},
    quantity: {type: Number, require:true},
    variety: {type: String, require:true},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('carrito', carritoSchema);