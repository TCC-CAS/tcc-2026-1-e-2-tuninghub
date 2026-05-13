import { Router } from 'express';
import EnderecoController from '../controllers/endereco.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rota Pública: Ver onde a oficina fica
router.get('/:idOficina', EnderecoController.buscar);

// Rota Protegida: Apenas a oficina logada altera seu endereço
router.post('/:idOficina', verificarToken, EnderecoController.salvar);

export default router;