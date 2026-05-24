import MontadoraService from '../services/montadora.service.js';

class MontadoraController {
    async listar(req, res, next) {
        try {
            const montadoras = await MontadoraService.listarMontadoras();
            res.status(200).json(montadoras);
        } catch (error) {
            next(error);
        }
    }

    async criar(req, res, next) {
        try {
            const montadora = await MontadoraService.criarMontadora(req.body);

            res.status(201).json({
                message: 'Montadora cadastrada com sucesso!',
                montadora
            });
        } catch (error) {
            if (error.message.includes('obrigatório') || error.message.includes('já está cadastrada')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }
}

export default new MontadoraController();