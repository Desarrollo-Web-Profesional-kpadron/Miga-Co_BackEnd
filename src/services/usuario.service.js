const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');

class UsuarioService {

  // REGISTRO
  async register(data) {
    const { nombre, email, password } = data;

    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      throw new Error('El correo ya está registrado');
    }

    const password_hash = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      password_hash
    });

    return usuario;
  }

  // LOGIN
  async login(email, password) {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const validPassword = await bcrypt.compare(password, usuario.password_hash);

    if (!validPassword) {
      throw new Error('Contraseña incorrecta');
    }

    return usuario;
  }

  // AGREGAR DIRECCIÓN
  async agregarDireccion(userId, direccion) {
    const usuario = await Usuario.findById(userId);

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    usuario.perfil.direcciones.push(direccion);
    await usuario.save();

    return usuario;
  }

  // OBTENER PERFIL
  async getPerfil(userId) {
    const usuario = await Usuario.findById(userId);
    if (!usuario) throw new Error('Usuario no encontrado');

    return usuario;
  }

}

module.exports = new UsuarioService();