import { IUserTokenDecoded } from './../models/user.model';
import config from 'config';
import { Request, NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthenticatedError } from '../errors';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.get('authorization');

    if (!token) {
      throw new UnauthenticatedError('Not authenticated');
    }

    token = token.replace('Bearer ', '');

    const jwtSecret = config.get<string>('jwtSecret');
    const { id, email } = jwt.verify(token, jwtSecret) as IUserTokenDecoded;

    res.locals.user = {
      id,
      email,
    };

    return next();
  } catch (e) {
    throw new UnauthenticatedError('Not authenticated');
  }
};

export default isAuthenticated;
