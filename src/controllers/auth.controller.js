const { pool } = require('../config/db');
const { signToken } = require('../helpers/jwt');
const Auth = require('../models/Auth');
const { hashPassword } = require('../helpers/bcrypt');


const handleLogin = async (req, res, next) => {
    try {
        const { email } = req.user;
        const data = { email };
        const token = signToken(data); // Firma el token con el email

        res.status(200).send({ token });
    } catch (error) {
        next(error);
    }
};

const handleRegister = async (req, res, next) => {
    try {
        const { email, password, rol, lenguage } = req.body; // Cambiado a 'lenguaje' para consistencia

        // Validar que todos los campos estén presentes
        if (!email || !password || !rol || !lenguage) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Registrar al usuario
        const user = await Auth.register(email, password, rol, lenguage);

        res.status(201).json({ message: 'Usuario registrado con éxito', user });
    } catch (error) {
        next(error);
    }
};

const handleGetUser = async (req, res, next) => {
    try {
        const { email } = req.user; // Obtiene el email del token decodificado
        const consulta = `
            SELECT id, email, rol, lenguage 
            FROM usuarios 
            WHERE email = $1
        `;
        const values = [email];
        const { rows: [user] } = await pool.query(consulta, values);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json([user]); // Devuelve todos los datos del usuario
    } catch (error) {
        next(error); // Pasa errores al middleware de manejo de errores
    }
};

module.exports = {
    handleLogin,
    handleRegister,
    handleGetUser
};