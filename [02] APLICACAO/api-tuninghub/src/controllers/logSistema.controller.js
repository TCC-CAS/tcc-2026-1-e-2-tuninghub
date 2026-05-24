import LogSistemaService from '../services/logSistema.service.js';

class LogSistemaController {
    async listar(req, res, next) {
        try {
            const logs = await LogSistemaService.listarLogs();
            res.status(200).json(logs);
        } catch (error) {
            next(error);
        }
    }

    async criar(req, res, next) {
        try {
            // Esta rota serve caso o Front-end precise registar um evento crítico na interface
            const log = await LogSistemaService.registrarLog(req.body);
            res.status(201).json({
                message: 'Evento registado no sistema.',
                log
            });
        } catch (error) {
            if (error.message.includes('obrigatória') || error.message.includes('associado')) {
                return res.status(400).json({ status: 'error', message: error.message });
            }
            next(error);
        }
    }
}

export default new LogSistemaController();