import MontadoraRepository from '../repositories/montadora.repository.js';

class MontadoraService {
    async listarMontadoras() {
        return await MontadoraRepository.findAll();
    }

    async buscarPorId(id) {
        const montadora = await MontadoraRepository.findById(id);
        if (!montadora) throw new Error('Montadora não encontrada.');
        return montadora;
    }

    async buscarPorNome(nome) {
        if (!nome) {
            throw new Error('O parâmetro nome é obrigatório para a busca.');
        }
        return await MontadoraRepository.searchByNome(nome);
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

    async atualizarMontadora(id, dados) {
        const { nome } = dados;
        if (!nome) throw new Error('O nome da montadora é obrigatório.');

        const montadora = await MontadoraRepository.findById(id);
        if (!montadora) throw new Error('Montadora não encontrada.');

        const montadoraExistente = await MontadoraRepository.findByNome(nome);
        // Garante que o nome não esteja em uso por OUTRA montadora
        if (montadoraExistente && montadoraExistente.IdMontadora !== Number(id)) {
            throw new Error('Outra montadora já está cadastrada com este nome.');
        }

        await MontadoraRepository.update(id, nome);
        return { idMontadora: Number(id), nome };
    }

    async deletarMontadora(id) {
        const montadora = await MontadoraRepository.findById(id);
        if (!montadora) throw new Error('Montadora não encontrada.');

        try {
            await MontadoraRepository.delete(id);
            return { message: 'Montadora excluída com sucesso!' };
        } catch (error) {
            // Tratamento de erro de integridade referencial (se houver modelos vinculados)
            if (error.code === 'ER_ROW_IS_REFERENCED_2') {
                throw new Error('Não é possível excluir: existem modelos associados a esta montadora.');
            }
            throw error;
        }
    }

}

export default new MontadoraService();