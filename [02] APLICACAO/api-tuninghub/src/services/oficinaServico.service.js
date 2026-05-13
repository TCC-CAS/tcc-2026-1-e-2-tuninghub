import OficinaServicoRepository from '../repositories/oficinaservico.repository.js';

class OficinaServicoService {
    async listarPorOficina(idOficina) {
        if (!idOficina) throw new Error('O Id da oficina é obrigatório.');
        return await OficinaServicoRepository.findByOficina(idOficina);
    }

    async vincularServico(dados) {
        const { idOficina, idServico } = dados;

        if (!idOficina || !idServico) {
            throw new Error('Os campos idOficina e idServico são obrigatórios.');
        }

        const vinculoExistente = await OficinaServicoRepository.checkVinculo(idOficina, idServico);
        if (vinculoExistente) {
            throw new Error('Este serviço já está vinculado a esta oficina.');
        }

        const novoId = await OficinaServicoRepository.vincular(idOficina, idServico);

        return {
            idOficinaServico: novoId,
            idOficina,
            idServico
        };
    }

    async desvincularServico(idOficina, idServico) {
        if (!idOficina || !idServico) {
            throw new Error('Os campos idOficina e idServico são obrigatórios para desvincular.');
        }

        const linhasAfetadas = await OficinaServicoRepository.desvincular(idOficina, idServico);

        if (linhasAfetadas === 0) {
            throw new Error('Vínculo não encontrado.');
        }

        return { message: 'Serviço desvinculado com sucesso.' };
    }
}

export default new OficinaServicoService();