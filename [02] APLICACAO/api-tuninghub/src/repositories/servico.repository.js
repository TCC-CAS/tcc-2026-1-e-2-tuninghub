import db from '../config/db.js';

class ServicoRepository {
    async findAll() {
        // Retorna todos os serviços ativos para preencher as listagens (dropdowns) do frontend
        const query = 'SELECT IdServico, Nome, Descricao, Categoria FROM Servico WHERE Ativo = 1';
        const [rows] = await db.execute(query);
        return rows;
    }

    async findByNome(nome) {
        const query = 'SELECT * FROM Servico WHERE Nome = ?';
        const [rows] = await db.execute(query, [nome]);
        return rows[0];
    }

    async create(nome, descricao, categoria) {
        const query = `
      INSERT INTO Servico (Nome, Descricao, Categoria) 
      VALUES (?, ?, ?)
    `;
        const [result] = await db.execute(query, [nome, descricao || null, categoria || null]);
        return result.insertId;
    }
}

export default new ServicoRepository();