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

    async buscarPorId(req, res, next) {
        try {
            const montadora = await MontadoraService.buscarPorId(req.params.id);
            res.status(200).json(montadora);
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }

    async buscarPorNome(req, res, next) {
        try {
            const { nome } = req.query; // Captura de /montadoras/buscar?nome=valor
            const montadoras = await MontadoraService.buscarPorNome(nome);
            res.status(200).json(montadoras);
        } catch (error) {
            if (error.message.includes('obrigatório')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
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

    async atualizar(req, res, next) {
        try {
            const montadora = await MontadoraService.atualizarMontadora(req.params.id, req.body);
            res.status(200).json({ message: 'Montadora atualizada com sucesso!', montadora });
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ status: 'error', message: error.message });
            }
            if (error.message.includes('obrigatório') || error.message.includes('Outra montadora')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }

    async deletar(req, res, next) {
        try {
            const result = await MontadoraService.deletarMontadora(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ status: 'error', message: error.message });
            }
            if (error.message.includes('associados')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }

}

export default new MontadoraController();