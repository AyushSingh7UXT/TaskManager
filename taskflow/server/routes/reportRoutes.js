import express from 'express';
import { exportReport } from '../controllers/reportController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/export', protect, exportReport);

export default router;
