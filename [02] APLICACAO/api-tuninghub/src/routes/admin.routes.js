import { Router } from 'express';
import { verificarToken } from '../middlewares/auth.middleware.js';
import AdminController from '../controllers/admin.controller.js';

const router = Router();

// Rota protegida
router.use(verificarToken(['ADMIN']));

router.get('/', AdminController.listar);
router.get('/buscar', AdminController.buscarPorEmail); // Exemplo de uso: /admin/buscar?email=teste@tuninghub.com
router.get('/:id', AdminController.buscarPorId);

router.post('/', AdminController.criar);
router.put('/:id', AdminController.alterar);
router.put('/alterarSenha/:id', AdminController.alterarSenha);
router.patch('/:id/reativar', AdminController.reativar); // Reverte SoftDelete


router.delete('/:id', AdminController.softDelete);
//router.delete('/hard/:id', AdminController.hardDelete);

export default router;