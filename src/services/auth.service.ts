import { ILoginInput } from '../schema/auth.schema';
import UserModel from '../models/user.model';
import { UnauthenticatedError } from '../errors';

export const login = async (input: ILoginInput) => {
  const { email, password } = input;
  const user = await UserModel.findOne({ email });

  if (!user) {
    console.log('error');
    throw new UnauthenticatedError('Invalid credentials');
  }
};
