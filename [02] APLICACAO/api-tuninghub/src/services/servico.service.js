import ServicoRepository from '../repositories/servico.repository.js';

class ServicoService {
    async listarServicos() {
        return await ServicoRepository.findAll();
    }

    async criarServico(dados) {
        const { nome, descricao, categoria } = dados;

        if (!nome) {
            throw new Error('O nome do serviço é obrigatório.');
        }

        // Regra de negócio: Evitar serviços duplicados no catálogo
        const servicoExistente = await ServicoRepository.findByNome(nome);
        if (servicoExistente) {
            throw new Error('Já existe um serviço registado com este nome no catálogo.');
        }

        const novoId = await ServicoRepository.create(nome, descricao, categoria);

        return {
            id: novoId,
            nome,
            descricao,
            categoria
        };
    }
}

export default new ServicoService();