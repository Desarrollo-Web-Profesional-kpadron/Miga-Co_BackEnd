const router = require("express").Router();
const productosController = require("../controllers/productos.controller");

// CRUD básico
router.get("/", productosController.listarProductos);
router.get("/buscar", productosController.buscar);
router.get("/categorias", productosController.obtenerCategorias);
router.get("/:id", productosController.obtenerProducto);
router.post("/", productosController.crearProducto);
router.put("/:id", productosController.actualizarProducto);
router.delete("/:id", productosController.eliminarProducto);

module.exports = router;
