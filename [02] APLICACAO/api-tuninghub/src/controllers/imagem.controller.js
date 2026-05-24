import ImagemService from '../services/imagem.service.js';

class ImagemController {
  async listar(req, res, next) {
    try {
      const { idOficina } = req.params;
      const imagens = await ImagemService.listarImagensOficina(idOficina);
      res.status(200).json(imagens);
    } catch (error) {
      next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const imagem = await ImagemService.adicionarImagem(req.body);
      res.status(201).json({
        message: 'Imagem registada com sucesso!',
        imagem
      });
    } catch (error) {
      if (error.message.includes('obrigatórios') || error.message.includes('Limite') || error.message.includes('já possui')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }
      next(error);
    }
  }
}

export default new ImagemController();