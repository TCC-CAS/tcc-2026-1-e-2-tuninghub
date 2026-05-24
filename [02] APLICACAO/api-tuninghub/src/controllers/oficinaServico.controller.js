import OficinaServicoService from '../services/oficinaServico.service.js';

class OficinaServicoController {
    async listar(req, res, next) {
        try {
            const { idOficina } = req.params;
            const servicos = await OficinaServicoService.listarPorOficina(idOficina);
            res.status(200).json(servicos);
        } catch (error) {
            next(error);
        }
    }

    async vincular(req, res, next) {
        try {
            const vinculo = await OficinaServicoService.vincularServico(req.body);
            res.status(201).json({
                message: 'Serviço vinculado à oficina com sucesso!',
                vinculo
            });
        } catch (error) {
            if (error.message.includes('obrigatório') || error.message.includes('já está vinculado')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }

    async desvincular(req, res, next) {
        try {
            const { idOficina, idServico } = req.params;
            const resultado = await OficinaServicoService.desvincularServico(idOficina, idServico);

            res.status(200).json(resultado);
        } catch (error) {
            if (error.message.includes('não encontrado')) {
                return res.status(404).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }
}

export default new OficinaServicoController();