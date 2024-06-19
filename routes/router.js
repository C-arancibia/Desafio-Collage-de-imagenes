import { Router } from 'express';
import { home, addImg, deleteImg } from '../controllers/controller.js';

const router = Router();

router.get('/', home);
router.post('/imagen', addImg); // Ruta POST para recibir y almacenar imágenes
router.delete('/imagen/:nombre', deleteImg); // Ruta DELETE para eliminar imágenes

export default router;

