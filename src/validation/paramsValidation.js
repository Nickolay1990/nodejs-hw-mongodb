import Joi from 'joi';
import { CONTACT_TYPES } from '../constants/contactTypes.js';

export const paramsValidationSchema = Joi.object({
  page: Joi.number().min(1).default(1),
  perPage: Joi.number().min(1).max(100).default(10),
  sortBy: Joi.string().valid('name', '_id').default('_id'),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc'),
  type: Joi.string()
    .valid(...CONTACT_TYPES)
    .optional(),
  isFavourite: Joi.bool().optional(),
});
