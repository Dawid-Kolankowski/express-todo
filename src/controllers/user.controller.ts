import { Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { createUser } from '../services/user.service';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';

export const createUserHandler = async (req: Request<{}, {}, IUser>, res: Response) => {
  try {
    const user = await createUser(req.body);
    return res.send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(StatusCodes.CONFLICT).send(e.message);
  }
};
