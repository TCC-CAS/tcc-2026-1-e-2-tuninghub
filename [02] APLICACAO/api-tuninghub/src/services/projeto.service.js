import ProjetoRepository from '../repositories/projeto.repository.js';

class ProjetoService {
  async listarProjetos() {
    return await ProjetoRepository.findAll();
  }

  async criarProjeto(dados) {
    const { idUsuario, idModelo, descricao } = dados;

    // Regras de negócio essenciais baseadas na restrição NOT NULL do BD
    if (!idUsuario || !idModelo) {
      throw new Error('Os campos idUsuario e idModelo são obrigatórios para criar um projeto.');
    }

    /* NOTA DO MENTOR: Em uma versão mais avançada, aqui seria o local ideal para:
      1. Verificar se o IdUsuario realmente existe chamando o UsuarioRepository.
      2. Verificar se o IdModelo existe chamando um ModeloRepository.
      3. Validar se o usuário não excedeu o limite de 3 projetos ativos (conforme seus requisitos anteriores).
    */

    const novoId = await ProjetoRepository.create(idUsuario, idModelo, descricao || null);
    
    return { 
      id: novoId, 
      idUsuario, 
      idModelo, 
      descricao 
    };
  }
}

export default new ProjetoService();