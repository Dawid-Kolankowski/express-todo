import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { createUser } from '../services/user.service';

export const createUserHandler = async (req: Request<{}, {}, IUser>, res: Response) => {
  const user = await createUser(req.body);
  return res.send(user);
};
