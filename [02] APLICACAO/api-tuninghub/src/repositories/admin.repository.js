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

  async create(nome, email, senhaHasheada, nivelAcesso) {
    const query = `
      INSERT INTO Admin (Nome, Email, Senha, NivelAcesso) 
      VALUES (?, ?, ?, ?)
    `;
    // O nível de acesso padrão no BD é 'PADRAO', mas passamos o valor aqui
    const [result] = await db.execute(query, [nome, email, senhaHasheada, nivelAcesso || 'PADRAO']);
    return result.insertId;
  }
}

export default new AdminRepository();