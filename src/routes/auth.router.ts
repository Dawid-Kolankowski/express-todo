import { refreshTokenHandler } from './../controllers/auth.controller';
import { refreshTokenSchema } from './../schema/auth.schema';
import express from 'express';
import { loginHandler } from '../controllers/auth.controller';
import { loginSchema } from '../schema/auth.schema';
import validateResource from '../middleware/validateResource';

const router = express.Router();

router.route('/login').post(validateResource(loginSchema), loginHandler);
router.route('/refresh').post(validateResource(refreshTokenSchema), refreshTokenHandler);
export default router;
