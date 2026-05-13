import PlanoService from '../services/plano.service.js';

class PlanoController {
  async listar(req, res, next) {
    try {
      const planos = await PlanoService.listarPlanos();
      res.status(200).json(planos);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const plano = await PlanoService.criarPlano(req.body);
      
      res.status(201).json({
        message: 'Plano criado com sucesso!',
        plano
      });
    } catch (error) {
      if (error.message.includes('obrigatórios') || error.message.includes('deve ser') || error.message.includes('negativo')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }
      next(error);
    }
  }
}

export default new PlanoController();