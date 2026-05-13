import { Router } from 'express';
import ProjetoController from '../controllers/projeto.controller.js';
// Garanta que esta linha está exatamente assim (com a extensão .js no final):
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', ProjetoController.listar);
router.post('/', verificarToken, ProjetoController.criar);

export default router;