'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clientSchema = Schema({
    name: {type: String, require:true},
    lastName : {type: String, required: true},
    country: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    image:{type: String, default:'perfil.png', required: true},
    phone: {type: String, required: true},
    gender: {type: String, required: false},
    dateOfBirth:{type: String, reuiqred: false},
    dni: {type: String, required: false},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('clients', clientSchema);