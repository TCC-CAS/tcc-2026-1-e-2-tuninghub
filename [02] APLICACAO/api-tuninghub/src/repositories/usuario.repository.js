import db from '../config/db.js';

class UsuarioRepository {
  async findAll() {
    const [rows] = await db.execute('SELECT IdUsuario, Nome, Email, Ativo, DataCriacao FROM Usuario');
    return rows;
  }
  
  async findByEmail(email) {
    const query = 'SELECT * FROM Usuario WHERE Email = ? AND Ativo = 1';
    const [rows] = await db.execute(query, [email]);
    return rows[0]; // Retorna o usuário se encontrar, ou undefined
  }

  async create(nome, email, senhaHasheada) {
    const query = 'INSERT INTO Usuario (Nome, Email, Senha) VALUES (?, ?, ?)';
    // Agora salvamos a senhaHasheada, NUNCA a senha original
    const [result] = await db.execute(query, [nome, email, senhaHasheada]);
    return result.insertId;
  }
}

export default new UsuarioRepository();