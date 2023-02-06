import { Request, Response } from 'express';
import { UnauthorizedError } from '../errors';

const isOwner = (req: Request, res: Response) => {
  if (req.body.user !== res.locals.user.id) {
    throw new UnauthorizedError('User not authorized to perform this operation');
  }
};

export default isOwner;
