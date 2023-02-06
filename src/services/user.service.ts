import { omit } from 'lodash';
import UserModel, { IUser } from '../models/user.model';

export const createUser = async (input: IUser) => {
  const user = await UserModel.create(input);

  return omit(user.toJSON(), ['password', 'createdAt', 'updatedAt', '__v']);
};
