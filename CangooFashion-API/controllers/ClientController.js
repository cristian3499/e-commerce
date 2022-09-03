'use strict'

const Client = require('../models/clients');
const Sale = require('../models/sale');
const Review = require('../models/review')
const DSale = require('../models/dSale');
const Contact = require('../models/contact');
const Address = require('../models/address')
const bcrypt = require('bcrypt-nodejs'); //Se va a encriptar la contraseña
const jwt = require('../helpers/jwt')

const registerClients = async function (req, res) {
    const data = req.body;

            if (data.password) {
                bcrypt.hash(data.password, null, null, async function (err, hash) {
                    if (hash) {
                        data.password = hash
                        const reg = await Client.create(data)
                        res.status(200).send({data : reg});
                    }else{
                        res.status(500).send({message: 'Error Server', data: undefined})
                    }
                })
            } else {
                res.status(400).send({message: 'Necesitas agregar una contraseña', data: undefined})
            }
}

const login = async function (req, res) {
    const dataLogin = req.body;
    var clientArray = [];
    clientArray = await Client.find({email: dataLogin.email});

    if (clientArray.length == 0) {
        res.status(401).send({message: 'El correo electronico no coincide', dataLogin: undefined})
    }else{
        const user = clientArray[0];
        bcrypt.compare(dataLogin.password, user.password, async function (error, check) {
            if (check) {
                res.status(200).send({
                    data: user,
                    token: jwt.createToken(user)
                })
            }else{
                res.status(401).send({message: 'La contraseña no coincide'});
            }
        })
    }
}

const getClients =  async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {

            let type = req.params['type'];
            let filter =  req.params['filter'];

                if (type ==  null || filter == 'null') {
                    const clients = await Client.find();
                    res.status(200).send({data: clients})
                }else {
                    if(type == 'lastName'){
                        let reg = await Client.find({lastName: new RegExp(filter, 'i')})
                        res.status(200).send({data: reg})
                } else if(type == 'email'){
                    let reg = await Client.find({email: new RegExp(filter, 'i')})
                        res.status(200).send({data: reg})
                }

            }
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const registerClientCMS = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            const data = req.body;

            if (data.password) {
                bcrypt.hash(data.password, null, null, async function (err, hash) {
                    if (hash) {
                        data.password = hash
                        const reg = await Client.create(data)
                        res.status(200).send({data : reg});
                    }else{
                        res.status(500).send({message: 'Error Server', data: undefined})
                    }
                })
            } else {
                res.status(400).send({message: 'Necesitas agregar una contraseña', data: undefined})
            }

            
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getClientById = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id']
            try {
                var reg = await Client.findById({_id : id})
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

const updateClient = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id']
            var data = req.body

            console.log(data.password);
            
            var reg = await Client.findByIdAndUpdate({_id : id}, 
                {
                    name : data.name,                 
                    lastName : data.lastName,
                    country : data.country, 
                    email : data.email,  
                    phone: data.phone,
                    gender: data.gender,
                    dateOfBirth: data.dateOfBirth,
                    dni:  data.dni         

                    })
                    res.status(200).send({data : reg})

        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const deleteClient = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id'];

            let reg = await Client.findByIdAndRemove({_id : id});
            res.status(200).send({data :reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getClientByIdShop = async function (req, res) {
    if (req.user) {
        var id = req.params['id']
            try {
                var reg = await Client.findById({_id : id})
                res.status(200).send({data : reg});
            } catch (error) {
                res.status(400).send({data : undefined});
            }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const updateClientShop = async function (req, res) {
    if (req.user) {
        const id = req.params['id']
        const data = req.body

        if (data.password) {
          bcrypt.hash(data.password, null, null, async function(err, hash){
            const reg = await Client.findByIdAndUpdate({_id : id},{
              name : data.name,
              lastName : data.lastName,
              country: data.country,
              password: hash,
              phone: data.phone,
              gender: data.gender,
              dateOfBirth: data.dateOfBirth,
              dni: data.dni
              
            });
            res.status(200).send({data : reg});
          });
        }else{
          const reg = await Client.findByIdAndUpdate({_id : id},{
            name : data.name,
            lastName : data.lastName,
            country: data.country,
            phone: data.phone,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth,
            dni: data.dni
            
          });
          res.status(200).send({data : reg});
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

//Address
const registerAddress = async function (req, res) {
    if (req.user) {
        let data = req.body
        if (data.principal) {
            const address = await Address.find({client : data.client})
            address.forEach( async element => {
                await Address.findByIdAndUpdate({_id :  element._id}, {principal : false})
            })
        }else{

        }
        

            const reg = await Address.create(data)
            
            res.status(200).send({data :reg})
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getAddress = async function (req, res) {
    if (req.user) {
        let id = req.params['id']
        const address = await Address.find({client : id}).populate('client').sort({createAt : - 1})
        
        res.status(200).send({data :address})
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const deleteAddress = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id'];
            let client = req.params['client'];

            const address = await Address.find({client : client})

            address.forEach( async element => {
                let reg = await Address.findByIdAndRemove({_id : id});
                res.status(200).send({data :reg})
            })

            
            
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const changeAddressPrincipal = async function (req, res) {
    if (req.user) {
        let id = req.params['id']
        let client = req.params['client']
            const address = await Address.find({client : client})

            address.forEach( async element => {
                await Address.findByIdAndUpdate({_id :  element._id}, {principal : false})
            })

            await Address.findByIdAndUpdate({_id : id}, {principal : true})

        res.status(200).send({data : true})
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getAddressPrincipal = async function (req, res) {
    if (req.user) {
        var id = req.params['id']
        var address = undefined

        address = await Address.findOne({client : id, principal : true})
        
        if (address == undefined) {
            res.status(200).send({data : undefined})
        }else{
            res.status(200).send({data : address})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

/* Ordenes */
const getOrderClient = async function (req, res) {
    if (req.user) {
        var id = req.params['id']
        var reg = await Sale.find({client : id}).sort({createAt : -1})

        if (reg.length >= 1) {
            res.status(200).send({data : reg})
        }else if(reg.length == 0){
            res.status(200).send({data : undefined})
        }

    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getOrderDetailsClient = async function (req, res) {
    if (req.user) {
        var id = req.params['id']
        
        try {
            let sale = await Sale.findById({_id : id}).populate('direccion').populate('client')
            let details = await DSale.find({sale : id}).populate('product')

            res.status(200).send({data : sale, details : details})

        } catch (error) {
            res.status(200).send({data : undefined})
        }

    }else{
        res.status(500).send({message : 'No access'})
    }
}

const updateStatus = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id']
            var data = req.body
            
            var reg = await Sale.findByIdAndUpdate({_id : id}, 
                {
                    estado : data.estado

                    })
                    res.status(200).send({data : reg})

        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

/* contacto */
const sendMessageContact = async function (req, res) {
    const data = req.body
    data.status = "Abierto"
    const reg = await Contact.create(data);
    res.status(200).send({data : reg})
}

/* Reviews */
const reviewClient = async function (req, res) {
    if (req.user) {
        let data = req.body
        const reg = await Review.create(data)
        
        res.status(200).send({data : reg})
    }else{
        res.status(500).send({message : 'No access'})
    }
}



module.exports = {
    registerClients,
    login,
    getClients,
    registerClientCMS,
    getClientById,
    updateClient,
    deleteClient,
    getClientByIdShop,
    updateClientShop,
    registerAddress,
    getAddress,
    changeAddressPrincipal,
    getAddressPrincipal,
    sendMessageContact,
    getOrderClient,
    getOrderDetailsClient,
    updateStatus,
    reviewClient,
    deleteAddress
}