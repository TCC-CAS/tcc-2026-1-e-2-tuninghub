import db from '../config/db.js';

class PlanoRepository {
  async findAll() {
    // Retorna apenas os planos ativos para exibição na vitrine
    const query = 'SELECT * FROM Plano WHERE Ativo = 1';
    const [rows] = await db.execute(query);
    return rows;
  }

  async findById(idPlano) {
    const query = 'SELECT * FROM Plano WHERE IdPlano = ? AND Ativo = 1';
    const [rows] = await db.execute(query, [idPlano]);
    return rows[0];
  }

  async create(nome, valor, duracaoDias) {
    const query = `
      INSERT INTO Plano (Nome, Valor, DuracaoDias) 
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [nome, valor || 0.00, duracaoDias]);
    return result.insertId;
  }
}

export default new PlanoRepository();