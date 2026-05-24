import db from '../config/db.js';

class EnderecoRepository {
    async findByOficina(idOficina) {
        const query = 'SELECT * FROM Endereco WHERE IdOficina = ?';
        const [rows] = await db.execute(query, [idOficina]);
        return rows[0];
    }

    async create(dados) {
        const { idOficina, rua, numero, bairro, cidade, estado, cep, complemento, latitude, longitude } = dados;
        const query = `
      INSERT INTO Endereco 
      (IdOficina, Rua, Numero, Bairro, Cidade, Estado, CEP, Complemento, Latitude, Longitude) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const [result] = await db.execute(query, [
            idOficina, rua, numero, bairro, cidade, estado, cep, complemento || null, latitude || null, longitude || null
        ]);
        return result.insertId;
    }

    async update(idOficina, dados) {
        const { rua, numero, bairro, cidade, estado, cep, complemento, latitude, longitude } = dados;
        const query = `
      UPDATE Endereco 
      SET Rua = ?, Numero = ?, Bairro = ?, Cidade = ?, Estado = ?, CEP = ?, Complemento = ?, Latitude = ?, Longitude = ?
      WHERE IdOficina = ?
    `;
        const [result] = await db.execute(query, [
            rua, numero, bairro, cidade, estado, cep, complemento, latitude, longitude, idOficina
        ]);
        return result.affectedRows;
    }
}

export default new EnderecoRepository();