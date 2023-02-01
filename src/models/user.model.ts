import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import generateHash from '../utils/generateHash';

export type IUser = {
  email: string;
  password: string;
};

export type IUserTokenDecoded = {
  email: string;
  id: string;
};

type IUserDocument = {
  comparePassword(password: string): Promise<Boolean>;
} & IUser &
  mongoose.Document &
  mongoose.SchemaTimestampsConfig;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await generateHash(this.password);

  return next();
});

userSchema.methods.comparePassword = async function (password: IUser['password']) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const UserModel = mongoose.model<IUserDocument>('User', userSchema);

export default UserModel;
