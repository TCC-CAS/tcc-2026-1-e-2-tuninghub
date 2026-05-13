import { Router } from 'express';
import ProjetoServicoController from '../controllers/projetoServico.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rota Protegida: Ver os serviços do projeto
router.get('/:idProjeto', verificarToken, ProjetoServicoController.listar);

// Rota Protegida: Adicionar um serviço ao projeto
router.post('/', verificarToken, ProjetoServicoController.vincular);

// Rota Protegida: Remover um serviço do projeto
router.delete('/:idProjeto/:idServico', verificarToken, ProjetoServicoController.desvincular);

export default router;