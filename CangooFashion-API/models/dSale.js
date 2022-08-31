'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dSaleSchema = Schema({
    product: {type: Schema.ObjectId, ref: 'products', require: true},
    sale: {type: Schema.ObjectId, ref: 'sale', require: true},
    subtotal: {type: Number, require:true},
    varieties: {type: String, require:true},
    quantity: {type: Number, require:true},
    client: {type: Schema.ObjectId, ref: 'clients', require: true},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('dsale', dSaleSchema);