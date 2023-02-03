import { refreshToken } from './../services/auth.service';
import mongoose, { Schema } from 'mongoose';
import generateHash from '../utils/generateHash';
import bcrypt from 'bcrypt';
import config from 'config';

export type IRefreshToken = {
  refreshToken: string;
  user: string;
};

type IRefreshTokenDocument = IRefreshToken & mongoose.Document;

const jwtRefreshExpiration = Number(config.get<string>('jwtRefreshExpiration')) * 24 * 60 * 60;

const refreshTokenSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
  },
  { timestamps: true },
);

refreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: jwtRefreshExpiration });

const RefreshTokenModel = mongoose.model<IRefreshTokenDocument>('RefreshToken', refreshTokenSchema);

export default RefreshTokenModel;
