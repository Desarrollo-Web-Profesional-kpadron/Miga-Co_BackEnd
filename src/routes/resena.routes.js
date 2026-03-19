const router = require('express').Router();
const resenaController = require('../controllers/resena.controller');

router.post('/', resenaController.crearResena);
router.get('/producto/:productoId', resenaController.getResenasPorProducto);
router.get('/producto/:productoId/promedio', resenaController.getPromedio);
router.delete('/:resenaId', resenaController.eliminarResena);

module.exports = router;