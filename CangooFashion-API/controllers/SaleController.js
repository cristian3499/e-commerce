const Sale = require('../models/sale')
const DSale = require('../models/dSale')
const Product = require('../models/products')
const Carrito = require('../models/carrito')

var fs = require('fs');
var handlebars = require('handlebars');
var ejs = require('ejs');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var path = require('path');
const stripe = require('stripe')('sk_test_51LV19EDvHTkSTTUCMgchAg3nOdTYrKMIdbeseLUbltVaoVSOaWHG7oBZlNlqTu8AxkK5pKnLOe1DnASOVivSnDCG00wmcm9IPV');


const RegisterSale = async function(req, res){
    if (req.user) {

        const data = req.body;
        const details = data.details
        /* const d_details = [] */

        const lastSale = await Sale.find().sort({createAt : - 1 })

        var serie;
        var correlativo
        var nVenta
        /* Validando el num de indices */
        if (lastSale.length == 0) {
            serie = '001'
            correlativo = '000001'

            nVenta = serie + '-' + correlativo
        }else{
            //mas a un registro en venta
            var lastNVenta = lastSale[0].nVenta
            var arrNVenta = lastNVenta.split('-')

            if (arrNVenta[1] != 999999) {
                var NewCorrelativo = zfill(parseInt(arrNVenta[1]) + 1, 6);
                nVenta = arrNVenta[0] + '-' + NewCorrelativo
            }else if(arrNVenta[1] == 999999){
                var NewSerie = zfill(parseInt(arrNVenta[0]) + 1, 3);
                nVenta = NewSerie + '-000001'
            }
        }

        data.nVenta =  nVenta;
        data.estado = 'Procesando'

        const sale = await Sale.create(data)

        details.forEach( async element => {
            element.sale = sale._id
            await DSale.create(element)
            /* d_details.push(element) */

            let elementProduct = await Product.findById({_id : element.product});
            let newStock = elementProduct.stock - element.quantity;

            await Product.findByIdAndUpdate({_id : element.product}, {stock : newStock});

            //limpiando carrito
            await Carrito.remove({client : data.client})
        });

        res.status(200).send({data : sale})
        
    }else{
        res.status(500).send({message : 'No access'})
    }
}

const sendEmail = async function(req, res){

    const id = req.params['id'];

    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };

    var transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
        user: 'cristian.dg3499@gmail.com',
        pass: 'cpccxouvzltohlel'
        }
    }));

    const sale = await Sale.findById({_id : id}).populate('client')
    var details = await DSale.find({sale : id}).populate('product')
    
    var client = sale.client.name + ' ' + sale.client.lastName;
    var _id = sale._id
    var date = new Date(sale.createAt)
    var data = details;
    var subtotal = sale.subtotal
    var precio_envio = sale.envioPrecio;

    

    readHTMLFile(process.cwd() + '/mail.html', (err, html)=>{
                        
        let rest_html = ejs.render(html, {data: data, client : client, _id : _id, date : date, subtotal : subtotal, precio_envio : precio_envio});
    
        var template = handlebars.compile(rest_html);
        var htmlToSend = template({op:true});
    
        var mailOptions = {
            from: 'cristian.dg3499@gmail.com',
            to: sale.client.email,
            subject: 'Gracias por tu compra, Mi Tienda',
            html: htmlToSend
        };
        res.status(200).send({data:true});
        transporter.sendMail(mailOptions, function(error, info){
            if (!error) {
                console.log('Email sent: ' + info.response);
                console.log(data);
            }
        });
    });
}

const createCharge = async function(req, res){
    const data = req.body;
   /*  const token = req.body.stripeToken; */
    const charge = await stripe.charges.create({
        amount: data.amount,
        currency: data.currency,
        source: token,
        description: 'My First Test Charge',
    });

    res.status(200).send({data : charge})
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (width <= length) {
        if (number < 0) {
            return ("-" + numberOutput.toString()); 
        } else {
            return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }

    }
}

module.exports = {
    RegisterSale,
    sendEmail,
    createCharge
}