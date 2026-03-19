const authService = require('../services/auth.service');

class AuthController {
  async registrar(req, res) {
    try {
      const { nombre, email, password } = req.body;

      // Validaciones básicas
      if (!nombre || !email || !password) {
        return res.status(400).json({ 
          error: 'Nombre, email y password son requeridos' 
        });
      }

      if (password.length < 6) {
        return res.status(400).json({ 
          error: 'La contraseña debe tener al menos 6 caracteres' 
        });
      }

      const resultado = await authService.registrar({ nombre, email, password });
      
      res.status(201).json({
        message: 'Usuario registrado exitosamente',
        ...resultado
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          error: 'Email y password son requeridos' 
        });
      }

      const resultado = await authService.login(email, password);
      
      res.json({
        message: 'Login exitoso',
        ...resultado
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();