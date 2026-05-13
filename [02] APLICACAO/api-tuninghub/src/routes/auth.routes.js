import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';

const router = Router();

// Rota: POST /api/auth/login
router.post('/login', AuthController.login);

// 👇 ESTA É A LINHA QUE ESTÁ FALTANDO PARA RESOLVER O ERRO 👇
export default router;