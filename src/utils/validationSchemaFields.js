import createHttpError from 'http-errors';
import { contactSchema } from '../db/models/contact.js';

export const checkValidData = (bodyData) => {
  const validFields = Object.keys(contactSchema.obj);
  if (Object.keys(bodyData).some((key) => !validFields.includes(key))) {
    throw createHttpError(400, 'Request body contains unexpected fields');
  }
  return;
};
