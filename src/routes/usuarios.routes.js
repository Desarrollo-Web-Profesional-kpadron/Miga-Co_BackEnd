const router = require('express').Router();
const usuarioController = require('../controllers/usuarios.controller');

router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.post('/:userId/direccion', usuarioController.agregarDireccion);
router.get('/:userId/perfil', usuarioController.getPerfil);

module.exports = router;