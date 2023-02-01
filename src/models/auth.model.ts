import mongoose, { Schema } from 'mongoose';
import generateHash from '../utils/generateHash';
import bcrypt from 'bcrypt';

export type IRefreshToken = {
  refreshToken: string;
  user: string;
};

type IRefreshTokenDocument = {
  compareToken(password: string): Promise<Boolean>;
} & IRefreshToken &
  mongoose.Document;

const refreshTokenSchema = new mongoose.Schema({
  refreshToken: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

refreshTokenSchema.pre('save', async function (next) {
  this.refreshToken = await generateHash(this.refreshToken);

  return next();
});

refreshTokenSchema.methods.compareToken = async function (password: IRefreshToken['refreshToken']) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const RefreshTokenModel = mongoose.model<IRefreshTokenDocument>('RefreshToken', refreshTokenSchema);

export default RefreshTokenModel;
