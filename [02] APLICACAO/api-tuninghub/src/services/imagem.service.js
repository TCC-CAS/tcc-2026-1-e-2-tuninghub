import ImagemRepository from '../repositories/imagem.repository.js';

class ImagemService {
  async listarImagensOficina(idOficina) {
    return await ImagemRepository.findAllByOficina(idOficina);
  }

  async adicionarImagem(dados) {
    const { idOficina, urlImagem, tipoImagem } = dados;

    if (!idOficina || !urlImagem || !tipoImagem) {
      throw new Error('IdOficina, UrlImagem e TipoImagem são obrigatórios.');
    }

    // Validação de limites (Baseado no RF13)
    if (tipoImagem === 'LOGO') {
      const totalLogos = await ImagemRepository.countByType(idOficina, 'LOGO');
      if (totalLogos >= 1) {
        throw new Error('A oficina já possui um logótipo ativo. Remova o atual antes de enviar um novo.');
      }
    } else if (tipoImagem === 'GALERIA') {
      const totalGaleria = await ImagemRepository.countByType(idOficina, 'GALERIA');
      if (totalGaleria >= 6) {
        throw new Error('Limite de 6 imagens na galeria atingido (Plano Pro).');
      }
    }

    const novoId = await ImagemRepository.create(idOficina, urlImagem, tipoImagem);

    return { id: novoId, idOficina, urlImagem, tipoImagem };
  }
}

export default new ImagemService();