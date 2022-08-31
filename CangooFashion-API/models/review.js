'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = Schema({
    product: {type: Schema.ObjectId, ref: 'products', require: true},
    client: {type: Schema.ObjectId, ref: 'clients', require: true},
    sale: {type: Schema.ObjectId, ref: 'sale', require: true},
    review: {type: String, require:true},
    starts: {type: Number, require:false},
    createAt: {type: Date, default: Date.now, required: true}
})

module.exports = mongoose.model('review', reviewSchema);