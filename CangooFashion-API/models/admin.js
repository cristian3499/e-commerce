'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = Schema({
    name: {type: String, require:true},
    lastName : {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    rol:{type: String, required: true},
    dni:{type: String, required: true}
    
})

module.exports = mongoose.model('admins', adminSchema );