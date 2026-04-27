import express from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/taskController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createTask).get(protect, getTasks);
router
  .route('/:id')
  .get(protect, getTaskById)
  .put(protect, updateTask)
  .delete(protect, authorize('admin'), deleteTask);

export default router;
