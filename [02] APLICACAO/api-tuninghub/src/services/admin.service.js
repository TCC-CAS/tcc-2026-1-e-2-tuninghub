import bcrypt from 'bcrypt';
import AdminRepository from '../repositories/admin.repository.js';

class AdminService {
  async listarAdmins() {
    return await AdminRepository.findAll();
  }

  async buscarPorId(id) {
    const admin = await AdminRepository.findById(id);
    if (!admin) return null;

    // Sanitarização: Remove a propriedade 'Senha' utilizando rest operator
    const { Senha, ...adminSemSenha } = admin;
    return adminSemSenha;
  }

  async buscarPorEmail(email) {
    if (!email) {
      throw new Error('O parâmetro e-mail é obrigatório para realizar a busca.');
    }

    const admin = await AdminRepository.findByEmail(email);
    if (!admin) return null;

    const { Senha, ...adminSemSenha } = admin;
    return adminSemSenha;
  }

  async softDeleteAdmin(id) {
    const admin = await AdminRepository.findById(id);
    if (!admin) return null; // Retorna nulo para indicar recurso inexistente

    await AdminRepository.softDelete(id);

    // Remove a propriedade 'Senha' usando desestruturação (Rest Operator)
    const { Senha, ...adminSemSenha } = admin;
    return adminSemSenha;
  }

  async hardDeleteAdmin(id) {
    const admin = await AdminRepository.findIncludingInactive(id);
    if (!admin) return null;

    await AdminRepository.hardDelete(id);

    const { Senha, ...adminSemSenha } = admin;
    return adminSemSenha;
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

  async alterarAdmin(id, dados) {
    // 1. Bloqueio de campos não autorizados
    const chavesRequisicao = Object.keys(dados).map(k => k.toLowerCase());

    if (chavesRequisicao.includes('datacriacao')) {
      throw new Error('O dado "DataCriacao" não pode ser alterado.');
    }
    if (chavesRequisicao.includes('ativo')) {
      throw new Error('O método adequado para inativar um usuário é o de delete.');
    }
    if (chavesRequisicao.includes('senha')) {
      throw new Error('A rota adequada para alteração de senha é POST /alterarSenha/:id');
    }

    // 2. Verificar se o Administrador existe
    const adminExistente = await AdminRepository.findById(id);
    if (!adminExistente) {
      throw new Error('Administrador não encontrado.');
    }

    // NORMALIZAÇÃO: Captura os dados independente de terem sido enviados como 'Nome' ou 'nome'
    const novoNome = dados.Nome || dados.nome;
    const novoEmail = dados.Email || dados.email;
    const novoNivelAcesso = dados.NivelAcesso || dados.nivelAcesso;

    // 3. Validação de conflito de e-mail 
    if (novoEmail && novoEmail !== adminExistente.Email) {
      const emailEmUso = await AdminRepository.findByEmail(novoEmail);
      if (emailEmUso) {
        throw new Error('Este e-mail já está vinculado a outra conta administrativa.');
      }
    }

    // 4. Mesclar dados: Se vier vazio na requisição, mantém o que já estava no banco
    const dadosParaAtualizar = {
      nome: novoNome || adminExistente.Nome,
      email: novoEmail || adminExistente.Email,
      nivelAcesso: novoNivelAcesso || adminExistente.NivelAcesso
    };

    // 5. Persistência
    await AdminRepository.update(id, dadosParaAtualizar);

    // 6. Retornar os dados atualizados (Sanitizando a Senha)
    const adminAtualizado = await AdminRepository.findById(id);
    const { Senha, ...adminSemSenha } = adminAtualizado;
    return adminSemSenha;
  }

  async alterarSenhaAdmin(id, dados) {
    // 1. Validar chaves enviadas no payload (ignorando Case Sensitivity)
    const chavesRequisicao = Object.keys(dados).map(k => k.toLowerCase());

    // Se houver alguma chave que NÃO seja 'senha', bloqueia
    const possuiOutrosCampos = chavesRequisicao.some(chave => chave !== 'senha');

    if (possuiOutrosCampos) {
      throw new Error('A rota adequada para alteração de outros dados é PUT /:id');
    }

    const novaSenha = dados.Senha || dados.senha;
    if (!novaSenha) {
      throw new Error('O campo "Senha" é obrigatório.');
    }

    // 2. Verificar se o Administrador existe
    const adminExistente = await AdminRepository.findById(id);
    if (!adminExistente) {
      throw new Error('Administrador não encontrado.');
    }

    // 3. Gerar Hash Seguro da Nova Senha
    const saltRounds = 10;
    const senhaHasheada = await bcrypt.hash(novaSenha, saltRounds);

    // 4. Persistir a alteração
    await AdminRepository.updatePassword(id, senhaHasheada);

    // 5. Retornar os dados do admin sanitizados (Sem expor a Senha)
    const adminAtualizado = await AdminRepository.findById(id);
    const { Senha, ...adminSemSenha } = adminAtualizado;
    return adminSemSenha;
  }

}

export default new AdminService();