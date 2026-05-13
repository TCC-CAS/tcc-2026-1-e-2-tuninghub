import bcrypt from 'bcrypt';
import AdminRepository from '../repositories/admin.repository.js';

class AdminService {
  async listarAdmins() {
    return await AdminRepository.findAll();
  }

  async criarAdmin(dados) {
    const { nome, email, senha, nivelAcesso } = dados;

    if (!nome || !email || !senha) {
      throw new Error('Nome, Email e Senha são obrigatórios para registrar um Admin.');
    }

    // 1. Verifica se e-mail já existe
    const adminExistente = await AdminRepository.findByEmail(email);
    if (adminExistente) {
      throw new Error('Este e-mail já está vinculado a uma conta administrativa.');
    }

    // 2. Hash da senha
    const saltRounds = 10;
    const senhaHasheada = await bcrypt.hash(senha, saltRounds);

    // 3. Persistência
    const novoId = await AdminRepository.create(nome, email, senhaHasheada, nivelAcesso);

    return {
      id: novoId,
      nome,
      email,
      nivelAcesso: nivelAcesso || 'PADRAO'
    };
  }
}

export default new AdminService();