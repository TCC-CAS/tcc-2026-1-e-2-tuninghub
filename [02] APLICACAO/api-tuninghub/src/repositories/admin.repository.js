import db from '../config/db.js';

class AdminRepository {
  async findAll() {
    const query = `
      SELECT IdAdmin, Nome, Email, NivelAcesso, Ativo, DataCriacao 
      FROM Admin 
      WHERE Ativo = 1
    `;
    const [rows] = await db.execute(query);
    return rows;
  }

  async findByEmail(email) {
    const query = 'SELECT * FROM Admin WHERE Email = ?';
    const [rows] = await db.execute(query, [email]);
    return rows[0];
  }

  async findById(id) {
    const query = 'SELECT * FROM Admin WHERE IdAdmin = ? AND Ativo = 1';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }

  async findIncludingInactive(id) {
    const query = 'SELECT * FROM Admin WHERE IdAdmin = ?';
    const [rows] = await db.execute(query, [id]);
    return rows[0];
  }

  async softDelete(id) {
    const query = 'UPDATE Admin SET Ativo = 0 WHERE IdAdmin = ?';
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }

  // Hard Delete: Remove fisicamente a linha da tabela
  async hardDelete(id) {
    const query = 'DELETE FROM Admin WHERE IdAdmin = ?';
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }

  async create(nome, email, senhaHasheada, nivelAcesso) {
    const query = `
      INSERT INTO Admin (Nome, Email, Senha, NivelAcesso) 
      VALUES (?, ?, ?, ?)
    `;
    // O nível de acesso padrão no BD é 'PADRAO', mas passamos o valor aqui
    const [result] = await db.execute(query, [nome, email, senhaHasheada, nivelAcesso || 'PADRAO']);
    return result.insertId;
  }

  async update(id, dados) {
    const query = `
      UPDATE Admin 
      SET Nome = ?, Email = ?, NivelAcesso = ? 
      WHERE IdAdmin = ?
    `;
    const [result] = await db.execute(query, [
      dados.nome,
      dados.email,
      dados.nivelAcesso,
      id
    ]);
    return result.affectedRows > 0;
  }

  async updatePassword(id, senhaHasheada) {
    const query = 'UPDATE Admin SET Senha = ? WHERE IdAdmin = ?';
    const [result] = await db.execute(query, [senhaHasheada, id]);
    return result.affectedRows > 0;
  }

  async reactivate(id) {
    const query = 'UPDATE Admin SET Ativo = 1 WHERE IdAdmin = ?';
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  }

}

export default new AdminRepository();