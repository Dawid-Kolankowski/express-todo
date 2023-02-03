import express from 'express';
import { createUserHandler } from '../controllers/user.controller';
import { createUserSchema } from '../schema/user.schema';
import validateResource from '../utils/validateResource';

const router = express.Router();

router.route('/register').post(validateResource(createUserSchema), createUserHandler);

export default router;
