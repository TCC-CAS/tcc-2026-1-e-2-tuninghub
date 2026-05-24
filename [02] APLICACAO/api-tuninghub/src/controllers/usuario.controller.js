import UsuarioService from '../services/usuario.service.js';

class UsuarioController {
  async listar(req, res, next) {
    try {
      const usuarios = await UsuarioService.listarUsuarios();
      res.status(200).json(usuarios);
    } catch (error) {
      next(error); // Repassa para o Middleware de Erro Centralizado
    }
  }

  async criar(req, res, next) {
    try {
      // Extraindo payload da requisição
      const dados = req.body;
      
      const usuario = await UsuarioService.criarUsuario(dados);
      res.status(201).json({
        message: 'Usuário criado com sucesso',
        usuario
      });
    } catch (error) {
      next(error); 
    }
  }
}

export default new UsuarioController();