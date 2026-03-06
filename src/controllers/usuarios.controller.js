const usuarioService = require('../services/usuario.service');

class UsuarioController {

  async register(req, res) {
    try {
      const usuario = await usuarioService.register(req.body);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const usuario = await usuarioService.login(email, password);
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async agregarDireccion(req, res) {
    try {
      const { userId } = req.params;
      const direccion = req.body;

      const usuario = await usuarioService.agregarDireccion(userId, direccion);
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getPerfil(req, res) {
    try {
      const { userId } = req.params;
      const usuario = await usuarioService.getPerfil(userId);
      res.json(usuario);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

}

module.exports = new UsuarioController();