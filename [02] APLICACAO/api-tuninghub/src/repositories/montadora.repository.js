import db from '../config/db.js';

class MontadoraRepository {
    async findAll() {
        // Ordenamos alfabeticamente para facilitar a exibição no Front-end
        const query = 'SELECT * FROM Montadora ORDER BY Nome ASC';
        const [rows] = await db.execute(query);
        return rows;
    }

    async findById(id) {
        const query = 'SELECT * FROM Montadora WHERE IdMontadora = ?';
        const [rows] = await db.execute(query, [id]);
        return rows[0]; // Retorna a montadora se achar, ou undefined
    }

    // Adicione este método dentro da classe MontadoraRepository
    async searchByNome(nome) {
        // O LIKE com % permite achar montadoras que contenham a palavra em qualquer parte do nome
        const query = 'SELECT * FROM Montadora WHERE Nome LIKE ? ORDER BY Nome ASC';
        const [rows] = await db.execute(query, [`%${nome}%`]);
        return rows;
    }

    async create(nome) {
        const query = 'INSERT INTO Montadora (Nome) VALUES (?)';
        const [result] = await db.execute(query, [nome]);
        return result.insertId;
    }

    async update(id, nome) {
        const query = 'UPDATE Montadora SET Nome = ? WHERE IdMontadora = ?';
        await db.execute(query, [nome, id]);
    }

    async delete(id) {
        const query = 'DELETE FROM Montadora WHERE IdMontadora = ?';
        await db.execute(query, [id]);
    }
}

export default new MontadoraRepository();