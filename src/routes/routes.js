const { Router } = require('express');
const { handleLogin, handleRegister, handleGetUser } = require('../controllers/auth.controller');
const { verificarCredencialesMiddleware, validarTokenMiddleware } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/login', verificarCredencialesMiddleware, handleLogin); // login
router.post('/usuarios', handleRegister); // registrar usuarios
router.get('/usuarios', validarTokenMiddleware, handleGetUser); // obtener usuarios autenticados

module.exports = router;