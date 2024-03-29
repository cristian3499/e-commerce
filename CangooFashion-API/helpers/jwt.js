'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = "cangoofashion" //Generando ccontraseña para encriptar datos

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name : user.name,
        lastName: user.lastName,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload, secret);
}