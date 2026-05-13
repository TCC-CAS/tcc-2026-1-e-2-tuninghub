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
}

export default new AdminController();