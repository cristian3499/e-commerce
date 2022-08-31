'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = Schema({
    client: {type: Schema.ObjectId, ref: 'clients', required: true},
    destinatario : {type : String, required :  true},
    dni : {type : String, required :  true},
    zip : {type : String, required :  true},
    direccion : {type : String, required :  true},
    pais : {type : String, required :  true},
    region : {type : String, required :  false},
    provincia : {type : String, required :  false},
    distrito : {type : String, required :  false},
    telefono : {type : String, required :  true},
    principal : {type : Boolean, required :  true},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('address', addressSchema);