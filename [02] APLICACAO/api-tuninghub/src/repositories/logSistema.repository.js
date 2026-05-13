import db from '../config/db.js';

class LogSistemaRepository {
    async findAll() {
        // Usamos LEFT JOIN porque o log pode pertencer a um Usuário OU a um Admin.
        // Ordenamos de forma decrescente para ver os logs mais recentes primeiro.
        const query = `
      SELECT 
        l.IdLog, 
        l.Acao, 
        l.DataLog, 
        u.Nome AS NomeUsuario, 
        a.Nome AS NomeAdmin
      FROM LogSistema l
      LEFT JOIN Usuario u ON l.IdUsuario = u.IdUsuario
      LEFT JOIN Admin a ON l.IdAdmin = a.IdAdmin
      ORDER BY l.DataLog DESC
      LIMIT 100 -- Limitamos aos últimos 100 logs por questões de performance
    `;
        const [rows] = await db.execute(query);
        return rows;
    }

    async create(idUsuario, idAdmin, acao) {
        const query = 'INSERT INTO LogSistema (IdUsuario, IdAdmin, Acao) VALUES (?, ?, ?)';
        // Se o idUsuario for nulo, passamos null (e vice-versa para o Admin)
        const [result] = await db.execute(query, [idUsuario || null, idAdmin || null, acao]);
        return result.insertId;
    }
}

export default new LogSistemaRepository();