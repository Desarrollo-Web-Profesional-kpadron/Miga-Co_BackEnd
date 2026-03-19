// app.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const connectDB = require('./config/db');



const app = express();

// Middlewares que NO dependen de la DB
app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

// Variable para almacenar las rutas después de la conexión
let authRoutes, usuarioRoutes, productosRoutes, resenasRoutes;

// Conectar a DB y luego configurar rutas
connectDB().then(() => {
  // Importar rutas SOLO después de conectar
  authRoutes = require('./routes/auth.routes');
  usuarioRoutes = require('./routes/usuarios.routes');
  productosRoutes = require('./routes/productos.routes');
  resenasRoutes = require('./routes/resena.routes');

  
  // Configurar rutas
  app.use('/api/auth', authRoutes);
  app.use("/api/usuarios", usuarioRoutes);
  app.use("/api/productos", productosRoutes);
  //Reseñas
  app.use('/api/resenas', resenasRoutes);

  
  console.log('✅ Rutas configuradas después de la conexión a DB');
}).catch(err => {
  console.error('❌ Error conectando a DB:', err);
  process.exit(1);
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

module.exports = app;