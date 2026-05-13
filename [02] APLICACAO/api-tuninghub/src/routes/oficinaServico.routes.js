import { Router } from 'express';
import OficinaServicoController from '../controllers/oficinaservico.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Pública: Qualquer cliente vê o que a oficina faz
router.get('/:idOficina', OficinaServicoController.listar);

// Protegida: Oficina adiciona serviço
router.post('/', verificarToken, OficinaServicoController.vincular);

// Protegida: Oficina remove serviço
router.delete('/:idOficina/:idServico', verificarToken, OficinaServicoController.desvincular);

export default router;