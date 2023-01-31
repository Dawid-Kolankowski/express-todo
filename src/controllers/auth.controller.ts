import { Request, Response } from 'express';
import { ILoginInput } from '../schema/auth.schema';
import logger from '../utils/logger';
import { login } from '../services/auth.service';

export const loginHandler = async (req: Request<{}, {}, ILoginInput>, res: Response) => {
  const input = req.body;
  const token = await login(input);
  res.send({ ...token });
};
