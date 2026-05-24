import { Router } from 'express';
import OficinaController from '../controllers/oficina.controller.js';

const router = Router();

router.get('/', OficinaController.listar);
router.post('/', OficinaController.criar);

export default router;