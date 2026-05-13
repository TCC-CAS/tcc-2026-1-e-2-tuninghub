import db from '../config/db.js';

class ProjetoServicoRepository {

    // Lista todos os serviços que o cliente adicionou a um projeto específico
    async findByProjeto(idProjeto) {
        const query = `
      SELECT ps.IdProjetoServico, s.IdServico, s.Nome, s.Categoria, s.Descricao 
      FROM ProjetoServico ps
      INNER JOIN Servico s ON ps.IdServico = s.IdServico
      WHERE ps.IdProjeto = ?
    `;
        const [rows] = await db.execute(query, [idProjeto]);
        return rows;
    }

    // Verifica se o cliente já adicionou este serviço ao projeto
    async checkVinculo(idProjeto, idServico) {
        const query = 'SELECT * FROM ProjetoServico WHERE IdProjeto = ? AND IdServico = ?';
        const [rows] = await db.execute(query, [idProjeto, idServico]);
        return rows[0];
    }

    // Adiciona o serviço ao projeto (Carrinho de serviços)
    async vincular(idProjeto, idServico) {
        const query = 'INSERT INTO ProjetoServico (IdProjeto, IdServico) VALUES (?, ?)';
        const [result] = await db.execute(query, [idProjeto, idServico]);
        return result.insertId;
    }

    // Remove o serviço do projeto
    async desvincular(idProjeto, idServico) {
        const query = 'DELETE FROM ProjetoServico WHERE IdProjeto = ? AND IdServico = ?';
        const [result] = await db.execute(query, [idProjeto, idServico]);
        return result.affectedRows;
    }
}

export default new ProjetoServicoRepository();