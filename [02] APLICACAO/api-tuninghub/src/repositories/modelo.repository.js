import db from '../config/db.js';

class ModeloRepository {
    async findAll() {
        // INNER JOIN para trazer "Nome do Modelo" e "Nome da Montadora" na mesma query
        const query = `
      SELECT m.IdModelo, m.IdMontadora, m.Nome as Modelo, mo.Nome as Montadora
      FROM Modelo m
      INNER JOIN Montadora mo ON m.IdMontadora = mo.IdMontadora
      ORDER BY mo.Nome ASC, m.Nome ASC
    `;
        const [rows] = await db.execute(query);
        return rows;
    }

    // Excelente para Dropdowns em cascata no Frontend
    async findByMontadora(idMontadora) {
        const query = 'SELECT * FROM Modelo WHERE IdMontadora = ? ORDER BY Nome ASC';
        const [rows] = await db.execute(query, [idMontadora]);
        return rows;
    }

    async checkDuplicidade(idMontadora, nome) {
        const query = 'SELECT * FROM Modelo WHERE IdMontadora = ? AND Nome = ?';
        const [rows] = await db.execute(query, [idMontadora, nome]);
        return rows[0];
    }

    async create(idMontadora, nome) {
        const query = 'INSERT INTO Modelo (IdMontadora, Nome) VALUES (?, ?)';
        const [result] = await db.execute(query, [idMontadora, nome]);
        return result.insertId;
    }
}

export default new ModeloRepository();