'use strict'

const Admin = require('../models/admin');
const Sale = require('../models/sale')
const DSale = require('../models/dSale')
const Contact = require('../models/contact');
const bcrypt = require('bcrypt-nodejs'); //Se va a encriptar la contraseña
const jwt = require('../helpers/jwt')

const registerAdmins = async function (req, res) {
    const data = req.body; /* Va a ser el cuerpo del request */
    var adminsArray = [];
    adminsArray = await Admin.find({email: data.email});

    if (adminsArray.length == 0) {
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) {
                    data.password = hash
                    const adminRegister = await Admin.create(data);
                    res.status(200).send({data: adminRegister});
                }else{
                    res.status(500).send({message: 'Error Server', data: undefined})
                }
            })
        } else {
            res.status(400).send({message: 'Necesitas agregar una contraseña', data: undefined})
        }
    }else{
        res.status(400).send({message: 'Correo electronico ya existente, prueba con otro', data: undefined})
    }
}

const loginAdmin = async function (req, res) {
    const dataLogin = req.body;
    var adminArray = [];
    adminArray = await Admin.find({email: dataLogin.email});

    if (adminArray.length == 0) {
        res.status(401).send({message: 'El correo electronico no coincide', dataLogin: undefined})
    }else{
        const user = adminArray[0];
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

const getMessage = async function (req, res){
    if (req.user) {
        if (req.user.rol == 'Admin') {  
            const reg = await Contact.find().sort({createAt : -1})
            
            res.status(200).send({data :reg})
            
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const changeStatusMessage = async function (req, res){
    if (req.user) {
        if (req.user.rol == 'Admin') {  

            let id = req.params['id']
            const reg = await Contact.findByIdAndUpdate({_id : id}, {status: 'Cerrado'})
            
            res.status(200).send({data :reg})
            
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

//Sales
const salesHistory = async function (req, res){
    if (req.user) {
        if (req.user.rol == 'Admin') {  

            let sales = [];
            let desde = req.params['desde']
            let hasta = req.params['hasta']

            if (desde == 'undefined' && hasta == 'undefined') {
                sales = await Sale.find().populate('client').populate('direccion').sort({createAt : -1})
                res.status(200).send({data : sales})
            }else{
                let tt_desde = Date.parse(new Date(desde + 'T00:00:00'))/1000
                let tt_hasta = Date.parse(new Date(hasta + 'T00:00:00'))/1000

                let tem_sales = await Sale.find().populate('client').populate('direccion').sort({createAt : -1})

                for(var item of tem_sales){
                    var tt_created = Date.parse(new Date(item.createAt))/1000
                    if (tt_created >= tt_desde && tt_created <= tt_hasta) {
                        sales.push(item)
                    }
                }
                res.status(200).send({data : sales})
            }

            
            
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

/* KPIS */
const monthlyKpi = async function (req, res){
    if (req.user) {
        if (req.user.rol == 'Admin') {
            
            var enero = 0
            var febrero = 0
            var marzo = 0
            var abril = 0
            var mayo = 0
            var junio = 0
            var julio = 0
            var agosto = 0
            var septiembre = 0
            var octubre = 0
            var noviembre = 0
            var diciembre = 0

            var gananciaTotal = 0
            var totalMes = 0
            var countSales = 0
            var totalMesAnterior = 0

            const reg = await Sale.find()
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear()
            let currentMonth = currentDate.getMonth() + 1

            for(var item of reg){
                let createdAtDate = new Date(item.createAt)
                let mes  = createdAtDate.getMonth() + 1;
                
                if (createdAtDate.getFullYear() == currentYear) {
                    gananciaTotal = gananciaTotal + item.subtotal

                    if(mes == currentMonth){
                        totalMes = totalMes + item.subtotal
                        countSales = countSales + 1
                    }

                    if (mes == currentMonth - 1) {
                        totalMesAnterior = totalMesAnterior + item.subtotal
                    }

                    if (mes == 1) {
                        enero = enero + item.subtotal;
                    }else if(mes == 2){
                        febrero = febrero + item.subtotal
                    }else if(mes == 3){
                        marzo = marzo + item.subtotal
                    }else if(mes == 4){
                        abril = abril + item.subtotal
                    }else if(mes == 5){
                        mayo = mayo + item.subtotal
                    }else if(mes == 6){
                        junio = junio + item.subtotal
                    }else if(mes == 7){
                        julio = julio + item.subtotal
                    }else if(mes == 8){
                        agosto = agosto + item.subtotal
                    }else if(mes == 9){
                        septiembre = septiembre + item.subtotal
                    }else if(mes == 10){
                        octubre = octubre + item.subtotal
                    }else if(mes == 11){
                        noviembre = noviembre + item.subtotal
                    }else if(mes == 12){
                        diciembre = diciembre + item.subtotal
                    }
                }

                
            }
            res.status(200).send({
                enero : enero,
                febrero : febrero,
                marzo : marzo,
                abril : abril,
                mayo : mayo,
                junio : junio,
                julio : julio,
                agosto : agosto,
                septiembre : septiembre,
                octubre : octubre,
                noviembre : noviembre,
                diciembre : diciembre,
                gananciaTotal : gananciaTotal,
                totalMes : totalMes,
                countSales : countSales,
                totalMesAnterior : totalMesAnterior
            })
            
            
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}


module.exports = {
    registerAdmins,
    loginAdmin,
    getMessage,
    changeStatusMessage,
    salesHistory,
    monthlyKpi
}