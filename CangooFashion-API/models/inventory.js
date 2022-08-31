'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema = Schema({
    product: {type: Schema.ObjectId, ref: 'products', require: true},
    quantity: {type: Number, require:true},
    admin: {type: Schema.ObjectId, ref: 'admins', require:true},
    supplier: {type: String, require:true},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('inventory', inventorySchema);