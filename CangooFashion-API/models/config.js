'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configSchema = Schema({
    categories: [{type: Object, require:true}],
    businessName : {type: String, required: true},
    logo: {type: String, required: false},
    serie: {type: String, required: true},
    correlative: {type: String, required: true},
})

module.exports = mongoose.model('config', configSchema);