import authService from '../services/auth.service.js';

class AuthController {
  async login(req, res) {
    try {
      // 1. Extração de dados
      const { email, senha, tipoConta } = req.body;

      // 2. Validação básica de entrada
      if (!email || !senha || !tipoConta) {
        return res.status(400).json({
          erro: 'Os campos email, senha e tipoConta são obrigatórios.'
        });
      }

      // 3. Chamada à camada de serviço
      const authData = await authService.autenticar(email, senha, tipoConta.toLowerCase());

      // 4. Resposta de Sucesso
      return res.status(200).json({
        mensagem: 'Login realizado com sucesso.',
        ...authData
      });

    } catch (error) {
      // Tratamento de erros de negócio vs erros de sistema
      if (error.message === 'CREDENCIAIS_INVALIDAS') {
        return res.status(401).json({ erro: 'E-mail ou senha incorretos.' });
      }

      if (error.message === 'TIPO_CONTA_INVALIDO') {
        return res.status(400).json({ erro: 'Tipo de conta inválido. Use: usuario, oficina ou admin.' });
      }

      // Para erros genéricos/sistema, registramos no console, mas não vazamos a stack pro usuário final
      console.error('[AuthController] Erro no login:', error);
      return res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
    }
  }
}

export default new AuthController();