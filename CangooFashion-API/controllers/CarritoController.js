const Carrito = require('../models/carrito');

const addCart = async function (req, res) {
    if (req.user) {
        const data = req.body;

        const carClient = await Carrito.find({client : data.client, product : data.product})
        if (carClient.length == 0) {
            const reg = await Carrito.create(data)
            res.status(200).send({data :  reg})
        }else if(carClient.length >= 1 ){
            res.status(200).send({data :  undefined})
        }

        
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getClientCar = async function (req, res) {
    if (req.user) {
        const id = req.params['id']

        const carClient = await Carrito.find({client : id}).populate('product')
        
        res.status(200).send({data : carClient})
        
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const deleteClientCar = async function (req, res) {
    if (req.user) {
        const id = req.params['id']

        const reg = await Carrito.findByIdAndRemove({_id : id})
        res.status(200).send({data : reg})
    }else{
        res.status(500).send({message : 'No access'})
    }
}

module.exports = {
    addCart,
    getClientCar,
    deleteClientCar
}