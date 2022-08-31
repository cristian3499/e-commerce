'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = Schema({
    title: {type: String, require:true},
    slug : {type: String, required: true},
    galery: [{type: Object, required: false}],
    frontPage: {type: String, required: true},
    price: {type: Number, required: true},
    description:{type: String, required: true},
    context: {type: String, required: true},
    stock: {type: Number, required: true},
    nVentas:{type: Number, default: 0, reuiqred: true},
    nPuntos: {type: Number, default: 0, required: true},
    varieties : [{type: Object, require: true}],
    category: {type: String, required: true},
    titleVarieties: {type: String, required: false},
    status: {type: String, default: 'Edicion', required: true},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('products', productSchema);