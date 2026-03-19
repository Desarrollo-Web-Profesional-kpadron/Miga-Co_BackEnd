const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

class AuthService {
  async registrar(datosUsuario) {
    try {
      // Verificar si el usuario ya existe
      const usuarioExistente = await Usuario.findOne({ email: datosUsuario.email });
      if (usuarioExistente) {
        throw new Error('El email ya está registrado');
      }

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(10);
      const password_hash = await bcrypt.hash(datosUsuario.password, salt);

      // Crear nuevo usuario
      const usuario = new Usuario({
        nombre: datosUsuario.nombre,
        email: datosUsuario.email,
        password_hash,
        perfil: {
          direcciones: [],
          metodos_pago: []
        }
      });

      await usuario.save();

      // Generar token
      const token = this.generarToken(usuario);

      return {
        usuario: this.sanitizarUsuario(usuario),
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      // Buscar usuario por email
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        throw new Error('Credenciales inválidas');
      }

      // Verificar contraseña
      const passwordValida = await usuario.compararPassword(password);
      if (!passwordValida) {
        throw new Error('Credenciales inválidas');
      }

      // Generar token
      const token = this.generarToken(usuario);

      return {
        usuario: this.sanitizarUsuario(usuario),
        token
      };
    } catch (error) {
      throw error;
    }
  }

  generarToken(usuario) {
    return jwt.sign(
      { 
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );
  }

  verificarToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  sanitizarUsuario(usuario) {
    const usuarioObj = usuario.toObject();
    delete usuarioObj.password_hash;
    return usuarioObj;
  }
}

module.exports = new AuthService();