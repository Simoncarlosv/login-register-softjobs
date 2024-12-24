const { pool } = require('../config/db');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');

const verificarCredenciales = async (email, password) => {
    try {
        const consulta = "SELECT * FROM usuarios WHERE email = $1";
        const values = [email];
        const { rows: [user], rowCount } = await pool.query(consulta, values);
        
        if (!rowCount || !comparePassword(password, user.password)) {
            throw new Error('NOT_FOUND'); // Error si las credenciales no coinciden
        }
        return user;
    } catch (error) {
        throw error;
    }
};

const login = async (email, password) => {
    try {
        return await verificarCredenciales(email, password); // Llama a verificarCredenciales
    } catch (error) {
        throw error;
    }
};

const register = async (email, password, rol, lenguage) => {
    try {
        const hashedPassword = hashPassword(password); // Encripta la contraseña
        const consulta = `
            INSERT INTO usuarios (email, password, rol, lenguage) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [email, hashedPassword, rol, lenguage];
        const { rows: [user], rowCount } = await pool.query(consulta, values);

        if (!rowCount) {
            throw new Error('BAD_REQUEST');
        }
        return user;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    verificarCredenciales,
    login,
    register
};