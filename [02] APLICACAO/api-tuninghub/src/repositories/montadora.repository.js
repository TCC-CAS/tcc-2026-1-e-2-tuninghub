import db from '../config/db.js';

class MontadoraRepository {
    async findAll() {
        // Ordenamos alfabeticamente para facilitar a exibição no Front-end
        const query = 'SELECT * FROM Montadora WHERE Ativo = 1 ORDER BY Nome ASC';
        const [rows] = await db.execute(query);
        return rows;
    }

    async findByNome(nome) {
        const query = 'SELECT * FROM Montadora WHERE Nome = ?';
        const [rows] = await db.execute(query, [nome]);
        return rows[0]; // Retorna a montadora se achar, ou undefined
    }

    async create(nome) {
        const query = 'INSERT INTO Montadora (Nome) VALUES (?)';
        const [result] = await db.execute(query, [nome]);
        return result.insertId;
    }
}

export default new MontadoraRepository();