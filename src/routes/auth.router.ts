import express from 'express';
import { loginHandler } from '../controllers/auth.controller';
import { loginSchema } from '../schema/auth.schema';
import validateResource from '../utils/validateResource';

const router = express.Router();

router.route('/').post(validateResource(loginSchema), loginHandler);

export default router;
