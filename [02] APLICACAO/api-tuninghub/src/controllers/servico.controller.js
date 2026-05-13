import ServicoService from '../services/servico.service.js';

class ServicoController {
    async listar(req, res, next) {
        try {
            const servicos = await ServicoService.listarServicos();
            res.status(200).json(servicos);
        } catch (error) {
            next(error);
        }
    }

    async criar(req, res, next) {
        try {
            const servico = await ServicoService.criarServico(req.body);

            res.status(201).json({
                message: 'Serviço adicionado ao catálogo com sucesso!',
                servico
            });
        } catch (error) {
            if (error.message.includes('obrigatório') || error.message.includes('Já existe')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }
}

export default new ServicoController();