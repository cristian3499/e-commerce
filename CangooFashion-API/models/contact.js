'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = Schema({
    client: {type: String, require:true},
    message: {type: String, require:true},
    subject: {type: String, require:true},
    phone: {type: String, require:true},
    email: {type: String, require:true},
    status: {type: String, require:true},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('contact', contactSchema);