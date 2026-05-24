import ProjetoService from '../services/projeto.service.js';

class ProjetoController {
  async listar(req, res, next) {
    try {
      const projetos = await ProjetoService.listarProjetos();
      res.status(200).json(projetos);
    } catch (error) {
      next(error); // Encaminha para o middleware de erro global
    }
  }

  async criar(req, res, next) {
    try {
      const dados = req.body;
      const projeto = await ProjetoService.criarProjeto(dados);
      
      res.status(201).json({
        message: 'Projeto criado com sucesso!',
        projeto
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjetoController();