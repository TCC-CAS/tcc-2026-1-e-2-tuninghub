import MontadoraRepository from '../repositories/montadora.repository.js';

class MontadoraService {
    async listarMontadoras() {
        return await MontadoraRepository.findAll();
    }

    async criarMontadora(dados) {
        const { nome } = dados;

        if (!nome) {
            throw new Error('O nome da montadora é obrigatório.');
        }

        // Regra de Negócio: Prevenir duplicidade no catálogo
        const montadoraExistente = await MontadoraRepository.findByNome(nome);
        if (montadoraExistente) {
            throw new Error('Esta montadora já está cadastrada no sistema.');
        }

        const novoId = await MontadoraRepository.create(nome);

        return {
            idMontadora: novoId,
            nome
        };
    }
}

export default new MontadoraService();