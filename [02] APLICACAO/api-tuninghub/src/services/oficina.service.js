import bcrypt from 'bcrypt';
import OficinaRepository from '../repositories/oficina.repository.js';

class OficinaService {
  async listarOficinas() {
    return await OficinaRepository.findAll();
  }

  async criarOficina(dados) {
    const { nomeOficina, cnpj, nomeProprietario, telefone, email, senha } = dados;

    // 1. Validação de campos obrigatórios (baseado no NOT NULL do BD)
    if (!nomeOficina || !cnpj || !email || !senha) {
      throw new Error('Os campos NomeOficina, CNPJ, Email e Senha são obrigatórios.');
    }

    // 2. Verifica duplicidade de E-mail
    const emailExistente = await OficinaRepository.findByEmail(email);
    if (emailExistente) {
      throw new Error('Já existe uma oficina cadastrada com este e-mail.');
    }

    // 3. Verifica duplicidade de CNPJ
    const cnpjExistente = await OficinaRepository.findByCnpj(cnpj);
    if (cnpjExistente) {
      throw new Error('Já existe uma oficina cadastrada com este CNPJ.');
    }

    // 4. Criptografa a Senha
    const saltRounds = 10;
    const senhaHasheada = await bcrypt.hash(senha, saltRounds);

    // 5. Salva no banco de dados
    const novoId = await OficinaRepository.create({
      nomeOficina,
      cnpj,
      nomeProprietario,
      telefone,
      email,
      senhaHasheada
    });

    return {
      id: novoId,
      nomeOficina,
      cnpj,
      email
    };
  }
}

export default new OficinaService();