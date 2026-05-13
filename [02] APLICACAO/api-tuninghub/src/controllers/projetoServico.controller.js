import ProjetoServicoService from '../services/projetoServico.service.js';

class ProjetoServicoController {

    async listar(req, res, next) {
        try {
            const { idProjeto } = req.params;
            const servicos = await ProjetoServicoService.listarPorProjeto(idProjeto);
            res.status(200).json(servicos);
        } catch (error) {
            next(error);
        }
    }

    async vincular(req, res, next) {
        try {
            const vinculo = await ProjetoServicoService.adicionarServico(req.body);
            res.status(201).json({
                message: 'Serviço adicionado ao projeto com sucesso!',
                vinculo
            });
        } catch (error) {
            if (error.message.includes('obrigatório') || error.message.includes('já foi adicionado')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }

    async desvincular(req, res, next) {
        try {
            const { idProjeto, idServico } = req.params;
            const resultado = await ProjetoServicoService.removerServico(idProjeto, idServico);

            res.status(200).json(resultado);
        } catch (error) {
            if (error.message.includes('não foi encontrado')) {
                return res.status(404).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }
}

export default new ProjetoServicoController();