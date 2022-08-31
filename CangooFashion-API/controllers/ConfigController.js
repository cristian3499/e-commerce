'use strict'

const Config = require('../models/config');
const fs = require('fs');
const path = require('path');

const getConfig = async function (req, res){
    if (req.user) {
        if (req.user.rol == 'Admin') {  
            const reg = await Config.findById({_id : "62e4c28a7df78c227b111720"})
            
            res.status(200).send({data :reg})
            
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const updateConfig = async function (req, res) {

    if (req.user) {
        if (req.user.rol == 'Admin') {
            
            const data = req.body

            if (req.files) {
                console.log("Si hay img");
                const imgPath = req.files.logo.path; //Se esta tomando el ruta del indice path y asi tener el nombre
                const name = imgPath.split('\\');
                const nameLogo = name[2];

                let reg = await Config.findByIdAndUpdate({_id : "62e4c28a7df78c227b111720"}, {
                    categories : JSON.parse(data.categories),
                    businessName : data.businessName,
                    serie : data.serie,
                    logo : nameLogo,
                    correlative : data.correlative
                })
                //Borrando las imagenes actualizadas
                fs.stat('./uploads/configs/' + reg.logo, function (err) {
                    if (!err) {
                        fs.unlink('./uploads/configs/' + reg.logo, (err) => {
                            if (err) throw err; 
                        })
                    }
                })

                res.status(200).send({data : reg})
            }else{
                console.log("No hay img");
                let reg = await Config.findByIdAndUpdate({_id : "62e4c28a7df78c227b111720"}, {
                    categories : data.categories,
                    businessName : data.businessName,
                    serie : data.serie,
                    correlative : data.correlative
                })
    
                /* await Config.create({
                    categories : [],
                    businessName : "Cangoo Fashion",
                    logo : "logo.png",
                    serie : "001",
                    correlative : "000001"
                }) */
                res.status(200).send({data :reg})
            }
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getLogo = async function(req, res){
    var img = req.params['img']
    console.log(img);
    fs.stat('./uploads/configs/' + img, function (err) {
        if (!err) {
            let pathImg = './uploads/configs/' + img
            res.status(200).sendFile(path.resolve(pathImg))
        }else{
            let pathImg = './uploads/default.jpg'
            res.status(200).sendFile(path.resolve(pathImg))
        }
    })
}

const getConfigPublic = async function (req, res){
    const reg = await Config.findById({_id : "62e4c28a7df78c227b111720"})
    res.status(200).send({data :reg})
}

module.exports = {
    updateConfig,
    getConfig,
    getLogo,
    getConfigPublic
}