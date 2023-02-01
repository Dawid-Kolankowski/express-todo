import { IUserTokenDecoded } from './../models/user.model';
import { createTokens } from './../utils/jwtUtils';
import { ILoginInput } from '../schema/auth.schema';
import UserModel from '../models/user.model';
import { UnauthenticatedError } from '../errors';
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

  const tokens = createTokens(email, user._id);

  return { ...tokens };
};

// export const refreshToken = async (input: IRefreshTokenInput) => {
//   try {
//     const { refreshToken } = input;

//     const jwtSecret = config.get<string>('jwtSecret');
//     const { id, email } = jwt.verify(refreshToken, jwtSecret) as IUserTokenDecoded;

//     const tokens = createTokens(email, id);

//     return { ...tokens };
//   } catch (e) {
//     throw new UnauthenticatedError('Not authenticated');
//   }
// };
