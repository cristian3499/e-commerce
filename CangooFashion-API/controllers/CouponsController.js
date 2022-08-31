'use strict'

const Coupons = require('../models/coupons');

const registerCoupon = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            let data = req.body

            const reg = await Coupons.create(data)
            
            res.status(200).send({data :reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getCoupons = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var filter = req.params['filter']

            const reg = await Coupons.find({code : new RegExp(filter, 'i')}).sort({createAt: -1})
            
            res.status(200).send({data :reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getCouponById = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id']
            try {
                var reg = await Coupons.findById({_id : id})
                res.status(200).send({data : reg});
            } catch (error) {
                res.status(400).send({data : undefined});
            }

        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const updateCoupon = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id']
            var data = req.body
            
            var reg = await Coupons.findByIdAndUpdate({_id : id}, 
                {
                    code : data.code,                 
                    type : data.type,
                    value : data.value, 
                    limit : data.limit
                    })
                    
                    res.status(200).send({data : reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const deleteCoupon = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id'];

            let reg = await Coupons.findByIdAndRemove({_id : id});
            res.status(200).send({data :reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

module.exports = {
    registerCoupon,
    getCoupons,
    getCouponById,
    updateCoupon,
    deleteCoupon
}