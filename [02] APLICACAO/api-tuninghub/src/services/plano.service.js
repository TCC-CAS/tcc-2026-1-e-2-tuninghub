import PlanoRepository from '../repositories/plano.repository.js';

class PlanoService {
  async listarPlanos() {
    return await PlanoRepository.findAll();
  }

  async criarPlano(dados) {
    const { nome, valor, duracaoDias } = dados;

    // 1. Validação de presença
    if (!nome || !duracaoDias) {
      throw new Error('Os campos Nome e DuracaoDias são obrigatórios.');
    }

    // 2. Validação lógica de negócio
    if (duracaoDias <= 0) {
      throw new Error('A duração do plano deve ser de pelo menos 1 dia.');
    }

    if (valor < 0) {
      throw new Error('O valor do plano não pode ser negativo.');
    }

    // 3. Persistência
    const novoId = await PlanoRepository.create(nome, valor, duracaoDias);

    return {
      id: novoId,
      nome,
      valor: valor || 0.00,
      duracaoDias
    };
  }
}

export default new PlanoService();