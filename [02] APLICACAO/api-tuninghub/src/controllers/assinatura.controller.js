import AssinaturaService from '../services/assinatura.service.js';

class AssinaturaController {
  async listar(req, res, next) {
    try {
      const assinaturas = await AssinaturaService.listarAssinaturas();
      res.status(200).json(assinaturas);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const assinatura = await AssinaturaService.criarAssinatura(req.body);
      
      res.status(201).json({
        message: 'Assinatura registrada com sucesso!',
        assinatura
      });
    } catch (error) {
      // Retorna 400 (Bad Request) para erros de validação ou regras de negócio
      if (error.message.includes('obrigatórios') || error.message.includes('já possui')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }
      next(error);
    }
  }
}

export default new AssinaturaController();