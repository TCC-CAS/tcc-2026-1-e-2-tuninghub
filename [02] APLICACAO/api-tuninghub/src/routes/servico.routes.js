import { Router } from 'express';
import ServicoController from '../controllers/servico.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rota Pública: Listar o catálogo de serviços
router.get('/', ServicoController.listar);

// Rota Protegida: Adicionar um novo serviço ao catálogo (Idealmente feito por Admins)
router.post('/', verificarToken, ServicoController.criar);

export default router;