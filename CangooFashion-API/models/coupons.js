'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const couponsSchema = Schema({
    code: {type: String, require: true},
    type: {type: String, require: true}, //Vamos a manejarlo por porcentaje o por valor fijo
    value: {type: Number, require: true},
    limit: {type: Number, require: true},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('coupons', couponsSchema);