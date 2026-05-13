import { Router } from 'express';
import AdminController from '../controllers/admin.controller.js';

const router = Router();

router.get('/', AdminController.listar);
router.post('/', AdminController.criar);

export default router;