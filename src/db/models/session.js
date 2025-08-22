import { Schema, Types, model } from 'mongoose';
import { User } from './user.js';

export const sessionSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: User,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Session = model('sessions', sessionSchema);
