import { Router } from 'express';
const router = Router();

import {
	getById,
	addOrder,
	updateOrder,
	deleteOrder,
	sendOrder,
	deletaNoutboockByOrder,
} from '../controllers/oder.js';
import { verifyToken } from '../middleware/verify.js';

router.get('/byId/:id', getById);
router.post('/add/:noutbookId', verifyToken, addOrder);
router.put('/deleteNoteboock/:noutbookId', verifyToken, deletaNoutboockByOrder);
router.put('/update/:id', updateOrder);
router.delete('/delete/:id', deleteOrder);
router.get('/sendPayment/:orderId', sendOrder);

export default router;
