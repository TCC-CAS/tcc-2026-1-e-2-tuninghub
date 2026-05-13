import AuthService from '../services/auth.service.js';

class AuthController {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ status: 'error', message: 'E-mail e senha são obrigatórios.' });
      }

      const resultado = await AuthService.loginUsuario(email, senha);

      res.status(200).json({
        message: 'Login realizado com sucesso!',
        data: resultado
      });
    } catch (error) {
      // Se for o nosso erro de "E-mail ou senha inválidos", mandamos um 401 Unauthorized
      if (error.message.includes('inválidos')) {
        return res.status(401).json({ status: 'error', message: error.message });
      }
      next(error);
    }
  }
}

export default new AuthController();