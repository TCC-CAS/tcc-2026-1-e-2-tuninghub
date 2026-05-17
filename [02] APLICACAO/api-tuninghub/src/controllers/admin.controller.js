import AdminService from '../services/admin.service.js';

class AdminController {
  async listar(req, res, next) {
    try {
      const admins = await AdminService.listarAdmins();
      res.status(200).json(admins);
    } catch (error) {
      next(error);
    }
  }

  async buscarPorId(req, res, next) {
    try {
      const { id } = req.params;
      const admin = await AdminService.buscarPorId(id);

      if (!admin) {
        return res.status(404).json({ status: 'error', message: 'Administrador não encontrado.' });
      }

      // Nota técnica: Alterar para 201 apenas se exigido por testes automatizados do TCC.
      return res.status(200).json(admin);
    } catch (error) {
      return next(error);
    }
  }

  // Novo método de controle para buscar por e-mail (Via Query string)
  async buscarPorEmail(req, res, next) {
    try {
      const { email } = req.query;
      const admin = await AdminService.buscarPorEmail(email);

      if (!admin) {
        return res.status(404).json({ status: 'error', message: 'Administrador não encontrado.' });
      }

      return res.status(200).json(admin);
    } catch (error) {
      if (error.message.includes('obrigatório')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }
      return next(error);
    }
  }

  async softDelete(req, res, next) {
    try {
      const { id } = req.params;
      const adminDeletado = await AdminService.softDeleteAdmin(id);

      // Critério de aceite: Caso não encontre, retorna erro 404 + mensagem
      if (!adminDeletado) {
        return res.status(404).json({ status: 'error', message: 'Administrador não encontrado.' });
      }

      return res.status(200).json(adminDeletado);
    } catch (error) {
      return next(error);
    }
  }

  // Controller para o Hard Delete
  async hardDelete(req, res, next) {
    try {
      const { id } = req.params;
      const adminDeletado = await AdminService.hardDeleteAdmin(id);

      if (!adminDeletado) {
        return res.status(404).json({ status: 'error', message: 'Administrador não encontrado.' });
      }

      return res.status(200).json(adminDeletado);
    } catch (error) {
      return next(error);
    }
  }

  async criar(req, res, next) {
    try {
      const admin = await AdminService.criarAdmin(req.body);
      res.status(201).json({
        message: 'Administrador criado com sucesso!',
        admin
      });
    } catch (error) {
      // Diferenciando erro de validação (400) de erro de servidor (500)
      if (error.message.includes('obrigatórios') || error.message.includes('e-mail já está')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }
      next(error);
    }
  }

  async alterar(req, res, next) {
    try {
      const { id } = req.params;

      const adminAtualizado = await AdminService.alterarAdmin(id, req.body);

      return res.status(200).json({
        message: 'Administrador atualizado com sucesso!',
        admin: adminAtualizado
      });
    } catch (error) {
      // 404: Caso o registro não exista
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ status: 'error', message: error.message });
      }

      // 400: Erros de Regra de Negócio e Validação de Payload
      if (
        error.message.includes('não pode ser alterado') ||
        error.message.includes('método adequado') ||
        error.message.includes('rota adequada') ||
        error.message.includes('outra conta administrativa')
      ) {
        return res.status(400).json({ status: 'error', message: error.message });
      }

      // 500: Outros erros internos repassados para o middleware global
      return next(error);
    }
  }

  async alterarSenha(req, res, next) {
    try {
      const { id } = req.params;

      const adminAtualizado = await AdminService.alterarSenhaAdmin(id, req.body);

      return res.status(200).json({
        message: 'Senha alterada com sucesso!',
        admin: adminAtualizado
      });
    } catch (error) {
      // 404: Caso o ID informado não pertença a um Admin válido
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ status: 'error', message: error.message });
      }

      // 400: Payload inválido ou tentativa de alterar outros dados
      if (error.message.includes('rota adequada') || error.message.includes('obrigatório')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }

      // 500: Erro inesperado repassado ao middleware global
      return next(error);
    }
  }

  async reativar(req, res, next) {
    try {
      const { id } = req.params;

      const adminReativado = await AdminService.reativarAdmin(id);

      return res.status(200).json({
        message: 'Administrador reativado com sucesso!',
        admin: adminReativado
      });
    } catch (error) {
      if (error.message.includes('não encontrado')) {
        return res.status(404).json({ status: 'error', message: error.message });
      }

      if (error.message.includes('já está ativo')) {
        return res.status(400).json({ status: 'error', message: error.message });
      }

      return next(error);
    }
  }

}

export default new AdminController();