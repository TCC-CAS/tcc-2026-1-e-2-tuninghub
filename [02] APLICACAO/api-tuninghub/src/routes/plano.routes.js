import { Router } from 'express';
import PlanoController from '../controllers/plano.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rota GET: Pública (Oficinas não logadas podem ver a página de preços)
router.get('/', PlanoController.listar);

// Rota POST: Protegida (Somente usuários autenticados, idealmente ADMINs, podem criar)
router.post('/', verificarToken, PlanoController.criar);

export default router;