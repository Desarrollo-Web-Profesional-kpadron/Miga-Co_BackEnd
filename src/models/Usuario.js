const { Schema, model } = require('mongoose');

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
        etiqueta: { type: String, default: 'Hogar' }, // Ej: "Oficina", "Casa"
        calle: String,
        ciudad: String,
        codigo_postal: String,
        referencias: String,
        es_principal: { type: Boolean, default: false }
      }
    ],
    // Almacenamos info del método de pago (no datos sensibles como el CVV)
    metodos_pago: [
      {
        tipo: { type: String, enum: ['tarjeta', 'paypal'], default: 'tarjeta' },
        last4: String,        // Últimos 4 dígitos para que el usuario la reconozca
        brand: String,        // Visa, Mastercard, etc.
        token_pasarela: String // ID del cliente en Stripe/PayPal (Crucial para seguridad)
      }
    ]
  },
  
  fecha_registro: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Usuario', UsuarioSchema);