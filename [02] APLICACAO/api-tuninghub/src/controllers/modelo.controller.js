import ModeloService from '../services/modelo.service.js';

class ModeloController {
    async listar(req, res, next) {
        try {
            const modelos = await ModeloService.listarModelos();
            res.status(200).json(modelos);
        } catch (error) {
            next(error);
        }
    }

    async listarPorMontadora(req, res, next) {
        try {
            const { idMontadora } = req.params;
            const modelos = await ModeloService.listarPorMontadora(idMontadora);
            res.status(200).json(modelos);
        } catch (error) {
            next(error);
        }
    }

    async criar(req, res, next) {
        try {
            const modelo = await ModeloService.criarModelo(req.body);
            res.status(201).json({
                message: 'Modelo registado com sucesso!',
                modelo
            });
        } catch (error) {
            if (error.message.includes('obrigatório') || error.message.includes('já está registado')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }
}

export default new ModeloController();