import { Router } from 'express';
import ModeloController from '../controllers/modelo.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rotas Públicas: Clientes consultam o catálogo de veículos
router.get('/', ModeloController.listar);
router.get('/montadora/:idMontadora', ModeloController.listarPorMontadora);

// Rota Protegida: Apenas administradores alimentam o sistema
router.post('/', verificarToken, ModeloController.criar);

export default router;