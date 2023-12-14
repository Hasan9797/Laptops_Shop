import { Router } from 'express';
const router = Router();

import { addNotebook, getById } from '../controllers/notebook.js';
import { verifyToken } from '../middleware/verify.js';

router.get('/byId/:id', getById);
router.post('/add', verifyToken, addNotebook);
router.post('/login');
router.put('/update/:id');
router.delete('/delete/:id');
// router.get()

export default router;
