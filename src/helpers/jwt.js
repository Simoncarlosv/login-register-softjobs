require('dotenv').config();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const signToken = (data) => {
    console.log('Payload para firmar el token:', data);
    return jwt.sign(data, String(JWT_SECRET), { expiresIn: '24h' }); // Genera un token
};

const verifyToken = (token) => {
    return jwt.verify(token, String(JWT_SECRET)); // Verifica el token
};

const decodeToken = (token) => {
    return jwt.decode(token); // Decodifica el token
};

module.exports = {
    signToken,
    verifyToken,
    decodeToken
};