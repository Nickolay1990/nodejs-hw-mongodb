import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/contactTypes.js';

export const createContactsValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.bool().default(false),
  contactType: Joi.string()
    .valid(...CONTACT_TYPES)
    .default('personal'),
});
