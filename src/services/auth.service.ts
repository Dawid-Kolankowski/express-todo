import { ILoginInput } from '../schema/auth.schema';
import UserModel from '../models/user.model';
import { UnauthenticatedError } from '../errors';
import jwtSign from '../utils/jwtSign';

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

  const token = jwtSign({ email, id: user._id });

  return token;
};
