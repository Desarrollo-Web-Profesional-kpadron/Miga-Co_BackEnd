// models/Usuario.js
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { 
    type: String, 
    unique: true, 
    required: true, 
    lowercase: true, 
    trim: true 
  },
  password_hash: { type: String, required: true },
  
  perfil: {
    direcciones: [
      {
        etiqueta: { type: String, default: 'Hogar' },
        calle: String,
        ciudad: String,
        codigo_postal: String,
        referencias: String,
        es_principal: { type: Boolean, default: false }
      }
    ],
    metodos_pago: [
      {
        tipo: { type: String, enum: ['tarjeta', 'paypal'], default: 'tarjeta' },
        last4: String,
        brand: String,
        token_pasarela: String
      }
    ]
  },
  
  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

// Método para comparar contraseñas
UsuarioSchema.methods.compararPassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = model('Usuario', UsuarioSchema);