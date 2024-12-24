const { verifyToken, decodeToken } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');
const Auth = require('../models/Auth');

const verificarCredencialesMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ error: 'Email y contraseña son requeridos' });
        }

        const user = await Auth.login(email, password);
        req.user = user; // Adjunta el usuario al objeto req
        next();
    } catch (error) {
        next(error);
    }
};

const validarTokenMiddleware = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader) {
            return res.status(401).send({ error: 'Encabezado de autorización no proporcionado' });
        }

        const token = authHeader.split("Bearer ")[1];
        if (!token) {
            return res.status(401).send({ error: 'Token no proporcionado en el encabezado de autorización' });
        }

        const decoded = verifyToken(token); // Verifica el token
        req.user = decoded; // Decodifica y adjunta al objeto req
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).send({ error: 'Token inválido' });
        }
        if (error.name === "TokenExpiredError") {
            return res.status(401).send({ error: 'Token expirado' });
        }
        next(error); // Pasa errores desconocidos al manejador de errores
    }
};

module.exports = {
    verificarCredencialesMiddleware,
    validarTokenMiddleware
};