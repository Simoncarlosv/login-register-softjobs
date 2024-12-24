const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt); // Encripta la contraseña
};

const comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword); // Compara la contraseña
};

module.exports = {
    hashPassword,
    comparePassword
};