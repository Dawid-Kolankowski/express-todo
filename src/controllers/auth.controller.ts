import { IRefreshTokenInput } from './../schema/auth.schema';
import { Request, Response } from 'express';
import { ILoginInput } from '../schema/auth.schema';
import { login, refreshToken } from '../services/auth.service';

export const loginHandler = async (req: Request<{}, {}, ILoginInput>, res: Response) => {
  const input = req.body;
  const token = await login(input);
  res.send({ ...token });
};

export const refreshTokenHandler = async (req: Request<{}, {}, IRefreshTokenInput>, res: Response) => {
  const input = req.body;
  const tokens = await refreshToken(input);
  res.send({ ...tokens });
};
