'use strict'

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port =  process.env.PORT || 4201;

var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors : {origin : '*'}
})

io.on('connection', function(socket){
    socket.on('removeProductCar', function(data){
        io.emit('newCar', data)
        console.log(data);
    })

    socket.on('addProductCar', function(data){
        io.emit('addNewCar', data)
        console.log(data);
    })
})

mongoose.connect('mongodb://127.0.0.1:27017/cangoo-fashion', {useUnifiedTopology: true, useNewUrlParser: true}, (err, res) => {
    if (err) {
        console.error(err);
    }else{
        server.listen(port, function () {
            console.log("Servidor corrieno en el puerto: " + port);
        })
    }
})

/* MANDAMOS A LLAMAR A LAS RUTAS */
const clientRoute = require('./routes/clients');
const admintRoute = require('./routes/admins');
const productRoute = require('./routes/products');
const couponsRoute = require('./routes/coupons');
const configRoute = require('./routes/config');
const carritoRoute = require('./routes/carrito');
const saleRoute = require('./routes/sale');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}))

//Como el proyecto se va aseprar en carpetas distintas, se va a enviar la data mediante dos puertos diferentes
// Uno que es el front y el otro el back
//Asi que damos permisos para que no tenga problemas con cors

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', clientRoute);
app.use('/api', admintRoute);
app.use('/api', productRoute);
app.use('/api', couponsRoute);
app.use('/api', configRoute);
app.use('/api', carritoRoute);
app.use('/api', saleRoute);

module.exports =  app;