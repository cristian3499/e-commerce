'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saleSchema = Schema({
    client: {type: Schema.ObjectId, ref: 'clients', require: true},
    nVenta: {type: String, require:true},
    subtotal: {type: Number, require:true},
    envioTitulo: {type: String, require:true},
    envioPrecio: {type: Number, require:true},
    transaccion: {type: String, require:true},
    cupon: {type: String, require:true},
    estado: {type: String, require:true},
    direccion: {type: Schema.ObjectId, ref: 'address', require: true},
    nota: {type: String, require:true},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('sale', saleSchema);