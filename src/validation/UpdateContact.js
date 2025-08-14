import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/contactTypes.js';

export const updateContactsValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(3).max(20),
  isFavourite: Joi.bool().default(false),
  contactType: Joi.string()
    .valid(...CONTACT_TYPES)
    .default('personal'),
});
