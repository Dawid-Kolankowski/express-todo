import UserModel, { IUser } from '../models/user.model';
import { CustomAPIError } from '../errors';

export const createUser = async (input: IUser) => {
  try {
    const user = await UserModel.create(input);
    return user;
  } catch (e: any) {
    throw new CustomAPIError(e);
  }
};
