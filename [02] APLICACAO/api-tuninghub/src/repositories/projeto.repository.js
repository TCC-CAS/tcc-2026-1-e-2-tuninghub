import db from '../config/db.js';

class ProjetoRepository {
  async findAll() {
    // Buscamos apenas os projetos ativos por padrão
    const query = 'SELECT * FROM Projeto WHERE Ativo = 1';
    const [rows] = await db.execute(query);
    return rows;
  }

  async create(idUsuario, idModelo, descricao) {
    const query = `
      INSERT INTO Projeto (IdUsuario, IdModelo, Descricao) 
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [idUsuario, idModelo, descricao]);
    return result.insertId;
  }
}

export default new ProjetoRepository();