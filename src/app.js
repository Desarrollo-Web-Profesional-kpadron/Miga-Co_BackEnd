const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarios.routes");
const productosRoutes = require("./routes/productos.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("uploads")); // Servir imágenes estáticas

// Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/productos", productosRoutes);
//app.use('/api/pedidos', require('./routes/pedidos.routes'));

module.exports = app;
