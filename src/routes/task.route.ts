import { taskSchema } from './../schema/task.schema';
import express from 'express';
import validateResource from '../middleware/validateResource';
import { getTasksHandler, createTaskHandler, updateTaskHandler } from '../controllers/task.controller';

const router = express.Router();

router.route('/').post(validateResource(taskSchema), createTaskHandler);
router.route('/').get(getTasksHandler);
router.route('/:id').put(validateResource(taskSchema), updateTaskHandler);

export default router;
