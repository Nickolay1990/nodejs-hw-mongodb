import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/contactTypes.js';
import { isValidObjectId } from 'mongoose';

export const createContactsValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.bool().default(false),
  contactType: Joi.string()
    .valid(...CONTACT_TYPES)
    .default('personal'),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('Parent id should be a valid mongo id');
    }
    return true;
  }),
});
