import bcrypt from 'bcrypt';
import UsuarioRepository from '../repositories/usuario.repository.js';

class UsuarioService {
  async listarUsuarios() {
    // Aqui poderia haver lógica extra (ex: filtrar apenas ativos)
    return await UsuarioRepository.findAll();
  }

  async criarUsuario(dados) {
    const { nome, email, senha } = dados;

    if (!nome || !email || !senha) {
      throw new Error('Todos os campos (nome, email, senha) são obrigatórios.');
    }

    // 1. Verifica se o e-mail já existe (Regra de Negócio)
    const usuarioExistente = await UsuarioRepository.findByEmail(email);
    if (usuarioExistente) {
      throw new Error('Este e-mail já está em uso.');
    }

    // 2. Criptografia da Senha (Hashing)
    // O número 10 é o "Salt Rounds" (Custo de processamento). 
    // 10 é o equilíbrio ideal entre segurança e performance hoje.
    const saltRounds = 10;
    const senhaHasheada = await bcrypt.hash(senha, saltRounds);
    
    // 3. Salva no banco com a senha protegida
    const novoId = await UsuarioRepository.create(nome, email, senhaHasheada);
    
    return { id: novoId, nome, email };
  }
}

export default new UsuarioService();