import LogSistemaRepository from '../repositories/logSistema.repository.js';

class LogSistemaService {
    async listarLogs() {
        return await LogSistemaRepository.findAll();
    }

    async registrarLog(dados) {
        const { idUsuario, idAdmin, acao } = dados;

        if (!acao) {
            throw new Error('A descrição da ação é obrigatória para o log.');
        }

        if (!idUsuario && !idAdmin) {
            throw new Error('O log deve estar associado a um utilizador ou a um administrador.');
        }

        const novoId = await LogSistemaRepository.create(idUsuario, idAdmin, acao);

        return {
            idLog: novoId,
            idUsuario,
            idAdmin,
            acao,
            timestamp: new Date().toISOString()
        };
    }
}

export default new LogSistemaService();