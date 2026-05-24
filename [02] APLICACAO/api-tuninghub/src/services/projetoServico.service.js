import ProjetoServicoRepository from '../repositories/projetoServico.repository.js';

class ProjetoServicoService {

    async listarPorProjeto(idProjeto) {
        if (!idProjeto) throw new Error('O Id do projeto é obrigatório.');
        return await ProjetoServicoRepository.findByProjeto(idProjeto);
    }

    async adicionarServico(dados) {
        const { idProjeto, idServico } = dados;

        if (!idProjeto || !idServico) {
            throw new Error('Os campos idProjeto e idServico são obrigatórios.');
        }

        // Regra de Negócio: Evitar que o cliente adicione o mesmo serviço duas vezes ao mesmo carro
        const vinculoExistente = await ProjetoServicoRepository.checkVinculo(idProjeto, idServico);
        if (vinculoExistente) {
            throw new Error('Este serviço já foi adicionado a este projeto.');
        }

        const novoId = await ProjetoServicoRepository.vincular(idProjeto, idServico);

        return {
            idProjetoServico: novoId,
            idProjeto,
            idServico
        };
    }

    async removerServico(idProjeto, idServico) {
        if (!idProjeto || !idServico) {
            throw new Error('Os campos idProjeto e idServico são obrigatórios para a remoção.');
        }

        const linhasAfetadas = await ProjetoServicoRepository.desvincular(idProjeto, idServico);

        if (linhasAfetadas === 0) {
            throw new Error('O serviço selecionado não foi encontrado neste projeto.');
        }

        return { message: 'Serviço removido do projeto com sucesso.' };
    }
}

export default new ProjetoServicoService();