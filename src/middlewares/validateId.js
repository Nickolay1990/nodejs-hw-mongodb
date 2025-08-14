import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateId = (req, res, next) => {
  if (isValidObjectId(req.params.contactId)) {
    next();
    return;
  }
  throw createHttpError(422, 'Invalid ID');
};
