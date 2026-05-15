import { Router } from 'express';
import MontadoraController from '../controllers/montadora.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Rota de busca (DEVE vir antes da rota /:id)
router.get('/', MontadoraController.listar);
router.get('/buscar', MontadoraController.buscarPorNome); // Exemplo de uso: GET /montadoras/buscar?nome=Chevrolet
router.get('/:id', MontadoraController.buscarPorId);

// Rotas Protegidas
router.post('/', verificarToken(['ADMIN']), MontadoraController.criar);
router.put('/:id', verificarToken(['ADMIN']), MontadoraController.atualizar);
router.delete('/:id', verificarToken(['ADMIN']), MontadoraController.deletar);

export default router;