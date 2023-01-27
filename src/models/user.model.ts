import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import config from 'config';

export type IUser = {
  email: string;
  password: string;
};

type IUserDocument = IUser & mongoose.Document & mongoose.SchemaTimestampsConfig;

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

  const salt = await bcrypt.genSalt(config.get<number>('saltRounds'));
  const hash = await bcrypt.hashSync(this.password, salt);

  this.password = hash;

  return next();
});

userSchema.methods.comparePassword = async function (password: IUser['password']) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const UserModel = mongoose.model<IUserDocument>('User', userSchema);

export default UserModel;
