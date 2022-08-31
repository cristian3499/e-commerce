'use strict'

const Product = require('../models/products');
const Inventory = require('../models/inventory');
const fs = require('fs')
const path = require('path')

const registerProduct = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            const data = req.body
            const imgPath = req.files.frontPage.path; //Se esta tomando el ruta del indice path y asi tener el nombre
            const name = imgPath.split('\\');
            const nameFontPage = name[2];

            data.slug = data.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
            data.frontPage = nameFontPage
            const reg =  await Product.create(data)

            let inventory = await Inventory.create({
                admin : req.user.sub,
                quantity : data.stock,
                supplier : 'Primer registro',
                product : reg._id
            })

            res.status(200).send({data : reg, dataInventory : inventory})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getProduct = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var filter = req.params['filter']
            const reg = await Product.find({title: new RegExp(filter, 'i')})
            res.status(200).send({data: reg});
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const getFrontPage = async function(req, res){
    var img = req.params['img']
    console.log(img);
    fs.stat('./uploads/products/' + img, function (err) {
        if (!err) {
            let pathImg = './uploads/products/' + img
            res.status(200).sendFile(path.resolve(pathImg))
        }else{
            let pathImg = './uploads/default.jpg'
            res.status(200).sendFile(path.resolve(pathImg))
        }
    })
}

const getProductById = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id']
            try {
                var reg = await Product.findById({_id : id})
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

const updateProduct = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            const id = req.params['id']
            const data = req.body

            if (req.files) {
                const imgPath = req.files.frontPage.path; //Se esta tomando el ruta del indice path y asi tener el nombre
                const name = imgPath.split('\\');
                const nameFontPage = name[2];

                const reg = await Product.findByIdAndUpdate({_id : id}, {
                    title : data.title,
                    stock : data.stock,
                    price : data.price,
                    category : data.category,
                    description : data.description,
                    context : data.context,
                    frontPage : nameFontPage
                })
                //Borrando las imagenes actualizadas
                fs.stat('./uploads/products/' + reg.frontPage, function (err) {
                    if (!err) {
                        fs.unlink('./uploads/products/' + reg.frontPage, (err) => {
                            if (err) throw err; 
                        })
                    }
                })

                res.status(200).send({data : reg})
            }else{
                const reg = await Product.findByIdAndUpdate({_id : id}, {
                    title : data.title,
                    stock : data.stock,
                    price : data.price,
                    category : data.category,
                    description : data.description,
                    context : data.context 
                })
                res.status(200).send({data : reg})
            }
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const deleteProduct = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id'];

            let reg = await Product.findByIdAndRemove({_id : id});
            //Borrando las imagenes actualizadas
            fs.stat('./uploads/products/' + reg.frontPage, function (err) {
                if (!err) {
                    fs.unlink('./uploads/products/' + reg.frontPage, (err) => {
                        if (err) throw err; 
                    })
                }
            })
            res.status(200).send({data :reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const inventoryProduct = async function (req, res){
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id'];

            const reg = await Inventory.find({product : id}).populate('admin').sort({createAt: -1})
            
            res.status(200).send({data :reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const deleteInventory = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            var id = req.params['id'];
            //Eliminando el onventario
            let reg = await Inventory.findByIdAndRemove({_id : id})
            //Obtener el registro del producto
            let prod = await Product.findById({_id : reg.product})
            //Calcular el nuevo stock
            let newStock = parseInt(prod.stock) - parseInt(reg.quantity);
            //Actualizando el nuevo stock al producto
            let product = await Product.findByIdAndUpdate({_id : reg.product}, {
                stock : newStock
            })
            
            res.status(200).send({data :product})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const registerInventary = async function(req, res){
    if (req.user) {
        if (req.user.rol == 'Admin') {
            const data = req.body

            const reg = await Inventory.create(data)
            //Obtener el registro del producto
            let prod = await Product.findById({_id : reg.product})
            //Calcular el nuevo 
                            //Stock actual          Stock a aumentar
            let newStock = parseInt(prod.stock) + parseInt(reg.quantity);
            //Actualizando el nuevo stock al producto
            let product = await Product.findByIdAndUpdate({_id : reg.product}, {
                stock : newStock
            })
            
            res.status(200).send({data :reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const updateVarieties = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            const id = req.params['id']
            const data = req.body

            const reg = await Product.findByIdAndUpdate({_id : id},
                {
                    titleVarieties : data.titleVarieties,
                    varieties : data.varieties
                })
                res.status(200).send({data : reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const addGalleryImage = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            const id = req.params['id']
            const data = req.body

            const imgPath = req.files.image.path; //It is taking the path of the path index and thus have the name
            const name = imgPath.split('\\');
            const nameImage = name[2]; 

            const reg = await Product.findByIdAndUpdate({_id : id},{
                $push : {galery : {
                    image : nameImage,
                    _id : data._id
                }}
            })
            res.status(200).send({data : reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const deleteGalleryImage = async function (req, res) {
    if (req.user) {
        if (req.user.rol == 'Admin') {
            const id = req.params['id']
            const data = req.body

            

            const reg = await Product.findByIdAndUpdate({_id : id},{
                $pull : {
                    galery : {
                        _id : data._id
                    }
                }
            })
            res.status(200).send({data : reg})
        }else{
            res.status(500).send({message : 'No access'})
        }
    }else{
        res.status(500).send({message : 'No access'})
    }
}

/* Api publica */

const getProductShop = async function (req, res) {
    var filter = req.params['filter']
    
    const reg = await Product.find({title: new RegExp(filter, 'i')}).sort({createdAt : -1})
    res.status(200).send({data: reg});
}

const getDetailProductShop = async function (req, res) {
    var slug = req.params['slug']
    
    const reg = await Product.findOne({slug: slug})
    res.status(200).send({data: reg});
}

const getProductRecommendedShop = async function (req, res) {
    var category = req.params['category']
    
    const reg = await Product.find({category: category}).sort({createdAt : -1}).limit(5)
    res.status(200).send({data: reg});
}

const getProductNewsShop = async function (req, res) {
    const reg = await Product.find().sort({createdAt : -1}).limit(8)
    res.status(200).send({data: reg});
}

const getProductMostSelledShop = async function (req, res) {
    const reg = await Product.find().sort({nVentas : -1}).limit(5)
    res.status(200).send({data: reg});
}

module.exports = {
    registerProduct,
    getProduct,
    getFrontPage,
    getProductById,
    updateProduct,
    deleteProduct,
    inventoryProduct,
    deleteInventory,
    registerInventary,
    updateVarieties,
    addGalleryImage,
    deleteGalleryImage,
    getProductShop,
    getDetailProductShop,
    getProductRecommendedShop,
    getProductNewsShop,
    getProductMostSelledShop
}