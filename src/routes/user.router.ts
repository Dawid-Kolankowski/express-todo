import express from 'express';
import { createUserHandler } from '../controllers/user.controller';

const router = express.Router();

router.route('/createUser').post(createUserHandler);

export default router;
