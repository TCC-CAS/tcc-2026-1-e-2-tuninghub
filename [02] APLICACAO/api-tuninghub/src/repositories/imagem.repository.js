import db from '../config/db.js';

class ImagemRepository {
  async findAllByOficina(idOficina) {
    const query = 'SELECT * FROM Imagem WHERE IdOficina = ? AND Status = "ATIVO"';
    const [rows] = await db.execute(query, [idOficina]);
    return rows;
  }

  async countByType(idOficina, tipo) {
    const query = 'SELECT COUNT(*) as total FROM Imagem WHERE IdOficina = ? AND TipoImagem = ? AND Status = "ATIVO"';
    const [rows] = await db.execute(query, [idOficina, tipo]);
    return rows[0].total;
  }

  async create(idOficina, urlImagem, tipoImagem) {
    const query = `
      INSERT INTO Imagem (IdOficina, UrlImagem, TipoImagem) 
      VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [idOficina, urlImagem, tipoImagem]);
    return result.insertId;
  }

  async delete(idImagem) {
    // Soft Delete: Apenas alteramos o status para INATIVO
    const query = 'UPDATE Imagem SET Status = "INATIVO" WHERE IdImagem = ?';
    await db.execute(query, [idImagem]);
  }
}

export default new ImagemRepository();