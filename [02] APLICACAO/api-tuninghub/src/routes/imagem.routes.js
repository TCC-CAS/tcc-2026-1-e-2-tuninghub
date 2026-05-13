import { Router } from 'express';
import ImagemController from '../controllers/imagem.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();

// Listar imagens de uma oficina específica (Público)
router.get('/oficina/:idOficina', ImagemController.listar);

// Adicionar imagem (Protegido - Apenas a oficina logada deve poder postar)
router.post('/', verificarToken, ImagemController.criar);

export default router;