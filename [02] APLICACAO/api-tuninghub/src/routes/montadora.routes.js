import { Router } from 'express';
import MontadoraController from '../controllers/montadora.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rota Pública: Clientes precisam ver a lista para cadastrar seus carros
router.get('/', MontadoraController.listar);

// Rota Protegida: Apenas usuários autenticados (Admins) adicionam novas montadoras
router.post('/', verificarToken, MontadoraController.criar);

export default router;