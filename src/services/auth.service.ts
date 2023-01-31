import { ILoginInput } from '../schema/auth.schema';
import UserModel from '../models/user.model';
import { UnauthenticatedError } from '../errors';
import { jwtSign } from '../utils/jwtUtils';

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

  const accessToken = jwtSign({ email, id: user._id }, 'jwtSecret', 'jwtExpiration');
  const refreshToken = jwtSign({ email, id: user._id }, 'jwtRefreshSecret', 'jwtRefreshExpiration');

  return { accessToken, refreshToken };
};
