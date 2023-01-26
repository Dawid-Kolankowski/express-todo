import UserModel, { IUser } from '../models/user.model';

export const createUser = async (input: IUser) => {
  try {
    const user = await UserModel.create(input);

    return user;
  } catch (e: any) {
    throw new Error(e);
  }
};
