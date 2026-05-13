import AssinaturaRepository from '../repositories/assinatura.repository.js';

class AssinaturaService {
  async listarAssinaturas() {
    return await AssinaturaRepository.findAll();
  }

  async criarAssinatura(dados) {
    const { idOficina, idPlano, dataInicio, dataFim } = dados;

    // 1. Validação de campos obrigatórios
    if (!idOficina || !idPlano || !dataInicio) {
      throw new Error('Os campos IdOficina, IdPlano e DataInicio são obrigatórios.');
    }

    // 2. Regra de Negócio: Verificar se a oficina já tem uma assinatura ATIVA
    const assinaturasAtivas = await AssinaturaRepository.findByOficina(idOficina);
    if (assinaturasAtivas.length > 0) {
      throw new Error('Esta oficina já possui uma assinatura ativa.');
    }

    /* NOTA DO MENTOR: 
       Em uma versão mais avançada, aqui seria o local ideal para buscar o 
       "DuracaoDias" na tabela "Plano" e calcular automaticamente a "dataFim",
       somando os dias à "dataInicio".
    */

    // 3. Persistência
    const novoId = await AssinaturaRepository.create(idOficina, idPlano, dataInicio, dataFim);

    return {
      id: novoId,
      idOficina,
      idPlano,
      dataInicio,
      dataFim,
      status: 'ATIVA' // Valor default do banco
    };
  }
}

export default new AssinaturaService();