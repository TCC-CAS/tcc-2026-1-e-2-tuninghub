import { Router } from 'express';
import AssinaturaController from '../controllers/assinatura.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Adicionamos a "catraca" em ambas as rotas
router.get('/', verificarToken, AssinaturaController.listar);
router.post('/', verificarToken, AssinaturaController.criar);

export default router;