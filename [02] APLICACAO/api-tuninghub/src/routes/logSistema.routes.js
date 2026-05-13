import { Router } from 'express';
import LogSistemaController from '../controllers/logSistema.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rota Super Protegida: Apenas administradores deveriam ver a auditoria do sistema
router.get('/', verificarToken, LogSistemaController.listar);

// Rota Protegida: Registo de eventos vindos do cliente
router.post('/', verificarToken, LogSistemaController.criar);

export default router;