import db from '../config/db.js';

class AssinaturaRepository {
  async findAll() {
    // Busca todas as assinaturas, idealmente trazendo dados da Oficina e do Plano futuramente
    const query = 'SELECT * FROM Assinatura';
    const [rows] = await db.execute(query);
    return rows;
  }

  async findByOficina(idOficina) {
    const query = 'SELECT * FROM Assinatura WHERE IdOficina = ? AND Status = "ATIVA"';
    const [rows] = await db.execute(query, [idOficina]);
    return rows;
  }

  async create(idOficina, idPlano, dataInicio, dataFim) {
    const query = `
      INSERT INTO Assinatura (IdOficina, IdPlano, DataInicio, DataFim) 
      VALUES (?, ?, ?, ?)
    `;
    
    // O status e a data de criação são definidos automaticamente pelo banco (DEFAULT)
    const [result] = await db.execute(query, [idOficina, idPlano, dataInicio, dataFim || null]);
    return result.insertId;
  }
}

export default new AssinaturaRepository();