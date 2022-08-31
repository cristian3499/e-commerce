'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secrdet = 'cangoofashion';

//Mandndo el token de autorizacion por el header para poder realizar alguna consulta desde el cms
exports.auth =  function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({message : 'No Authorization'})
    }

    //Validando si el token ya expiro o aun no
    const token  =  req.headers.authorization.replace(/['"]+/g,'') ;

    //Partiendo el token en sus3 partes
    const segment =  token.split('.');

    if (segment.length != 3) {
        return res.status(403).send({message : 'Invalid token'});
    }else{

        try {
            var payload = jwt.decode(token, secrdet)

            if (payload.exp <= moment().unix()) {
                return res.status(403).send({message : 'Expired token'});
            }
        } catch (error) {
            return res.status(403).send({message : 'Invalid token'});
        }

    }
    req.user = payload;
    next();
}