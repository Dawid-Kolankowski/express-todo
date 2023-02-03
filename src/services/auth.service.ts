import { createTokens } from './../utils/jwtUtils';
import { ILoginInput, IRefreshTokenInput } from '../schema/auth.schema';
import UserModel, { IUserTokenDecoded } from '../models/user.model';
import { UnauthenticatedError } from '../errors';
import RefreshTokenModel from '../models/auth.model';
import jwt from 'jsonwebtoken';
import config from 'config';

export const login = async (input: ILoginInput) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials');
  }

  const { accessToken, refreshToken } = createTokens(email, user.id);

  const refreshTokenDB = await RefreshTokenModel.findOne({ user: user.id });

  if (!refreshTokenDB) {
    await RefreshTokenModel.create({ refreshToken, user });
  } else {
    await refreshTokenDB.updateOne({ refreshToken });
  }

  return { accessToken, refreshToken };
};

export const refreshToken = async (input: IRefreshTokenInput) => {
  const { refreshToken } = input;

  const refreshTokenDB = await RefreshTokenModel.findOne({ refreshToken });

  if (!refreshTokenDB) {
    throw new UnauthenticatedError('Invalid token');
  }

  const jwtRefreshSecret = config.get<string>('jwtRefreshSecret');
  const { id, email } = jwt.verify(refreshToken, jwtRefreshSecret) as IUserTokenDecoded;

  const tokens = createTokens(email, id);

  await refreshTokenDB.updateOne({ refreshToken: tokens.refreshToken });

  return tokens;
};
