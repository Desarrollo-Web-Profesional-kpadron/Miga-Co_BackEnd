const Usuario = require('../models/Usuario');

class UsuarioService {
  async obtenerPerfil(userId) {
    try {
      const usuario = await Usuario.findById(userId).select('-password_hash');
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async actualizarPerfil(userId, datosActualizar) {
    try {
      // Prevenir actualización de campos sensibles
      const camposPermitidos = ['nombre'];
      const datos = {};
      
      camposPermitidos.forEach(campo => {
        if (datosActualizar[campo]) {
          datos[campo] = datosActualizar[campo];
        }
      });

      const usuario = await Usuario.findByIdAndUpdate(
        userId,
        { $set: datos },
        { new: true, runValidators: true }
      ).select('-password_hash');

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async agregarDireccion(userId, direccion) {
    try {
      // Si es principal, quitar principal de otras direcciones
      if (direccion.es_principal) {
        await Usuario.updateOne(
          { _id: userId, 'perfil.direcciones.es_principal': true },
          { $set: { 'perfil.direcciones.$.es_principal': false } }
        );
      }

      const usuario = await Usuario.findByIdAndUpdate(
        userId,
        { $push: { 'perfil.direcciones': direccion } },
        { new: true }
      ).select('-password_hash');

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async eliminarDireccion(userId, direccionId) {
    try {
      const usuario = await Usuario.findByIdAndUpdate(
        userId,
        { $pull: { 'perfil.direcciones': { _id: direccionId } } },
        { new: true }
      ).select('-password_hash');

      return usuario;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UsuarioService();