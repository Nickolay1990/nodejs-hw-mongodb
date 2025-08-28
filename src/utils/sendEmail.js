import nodemailer from 'nodemailer';
import { getEnvVar } from './getEnvVar.js';
import createHttpError from 'http-errors';

const transport = nodemailer.createTransport({
  host: getEnvVar('SMTP_HOST'),
  port: Number(getEnvVar('SMTP_PORT')),
  secure: true,
  auth: {
    user: getEnvVar('SMTP_USER'),
    pass: getEnvVar('SMTP_PASSWORD'),
  },
});

export const sendEmail = async (email, html, subject) => {
  try {
    await transport.sendMail({
      to: email,
      from: getEnvVar('SMTP_FROM'),
      subject,
      html,
    });
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
