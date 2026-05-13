import { Router } from 'express';
import UsuarioController from '../controllers/usuario.controller.js';

const router = Router();

router.get('/', UsuarioController.listar);
router.post('/', UsuarioController.criar);

export default router;