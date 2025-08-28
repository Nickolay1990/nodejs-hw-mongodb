import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import bcrypt from 'bcrypt';
import { Session } from '../db/models/session.js';
import { createSessionData } from '../utils/createSessionData.js';
import { sendEmail } from '../utils/sendEmail.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import jwt from 'jsonwebtoken';

export const createUser = async (payload) => {
  const isExistsUser = await User.findOne({ email: payload.email });

  if (isExistsUser) {
    throw createHttpError(409, 'Email in use');
  }

  const cryptedPassword = await bcrypt.hash(payload.password, 10);
  const user = await User.create({
    ...payload,
    password: cryptedPassword,
  });

  return user;
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw createHttpError(401, 'User with theese credentials does not exists');
  }

  const comparePassword = await bcrypt.compare(payload.password, user.password);

  if (!comparePassword) {
    throw createHttpError(401, 'User with theese credentials does not exists');
  }

  await Session.deleteOne({ userId: user._id });

  const sessionData = createSessionData(user._id);

  const session = await Session.create(sessionData);

  return session;
};

export const createNewSession = async (refreshToken) => {
  const oldSession = await Session.findOne({ refreshToken });

  if (!oldSession) {
    throw createHttpError(401, 'Session not found');
  }

  const user = await User.findById(oldSession.userId);

  await Session.findOneAndDelete({ refreshToken });

  if (!user || new Date() > oldSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session not found');
  }

  const newSessionData = createSessionData(user._id);

  const newSession = await Session.create(newSessionData);

  return newSession;
};

export const logout = async (refreshToken) => {
  await Session.findOneAndDelete({ refreshToken });
};

export const sendResetEmail = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const token = jwt.sign(
    {
      email: user.email,
      sub: user._id,
    },
    getEnvVar('JWT_SECRET'),
    { expiresIn: '5m' },
  );

  const link = `<a href="${getEnvVar(
    'APP_DOMAIN',
  )}/reset-password?token=${token}">Reset your password</a>`;

  await sendEmail(email, link, 'Reset password');
};

export const resetPassword = async (token, password) => {
  let userData;

  try {
    userData = jwt.verify(token, getEnvVar('JWT_SECRET'));
  } catch {
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await User.findById(userData.sub);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const cryptedPassword = await bcrypt.hash(password, 10);

  await Session.findOneAndDelete({ userId: userData.sub });

  user.password = cryptedPassword;
  user.save();
};
