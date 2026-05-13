import ModeloRepository from '../repositories/modelo.repository.js';

class ModeloService {
    async listarModelos() {
        return await ModeloRepository.findAll();
    }

    async listarPorMontadora(idMontadora) {
        if (!idMontadora) {
            throw new Error('O Id da montadora é obrigatório.');
        }
        return await ModeloRepository.findByMontadora(idMontadora);
    }

    async criarModelo(dados) {
        const { idMontadora, nome } = dados;

        if (!idMontadora || !nome) {
            throw new Error('O IdMontadora e o Nome do modelo são obrigatórios.');
        }

        // Regra de Negócio: Evitar dois modelos iguais na mesma montadora
        // Ex: Impedir que criem "Civic" duas vezes dentro da "Honda"
        const duplicado = await ModeloRepository.checkDuplicidade(idMontadora, nome);
        if (duplicado) {
            throw new Error('Este modelo já está registado para esta montadora.');
        }

        const novoId = await ModeloRepository.create(idMontadora, nome);

        return {
            idModelo: novoId,
            idMontadora,
            nome
        };
    }
}

export default new ModeloService();