import OficinaService from '../services/oficina.service.js';

class OficinaController {
  async listar(req, res, next) {
    try {
      const oficinas = await OficinaService.listarOficinas();
      res.status(200).json(oficinas);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const dados = req.body;
      const oficina = await OficinaService.criarOficina(dados);
      
      res.status(201).json({
        message: 'Oficina cadastrada com sucesso!',
        oficina
      });
    } catch (error) {
      // Se for erro de validação (ex: Email já existe), mandamos um 400 Bad Request
      if (error.message.includes('obrigatórios') || error.message.includes('Já existe')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }
      next(error);
    }
  }
}

export default new OficinaController();