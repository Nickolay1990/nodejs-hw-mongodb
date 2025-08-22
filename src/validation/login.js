import Joi from 'joi';

export const loginValidationSchema = Joi.object({
  email: Joi.string().min(3).email().required(),
  password: Joi.string().min(3).max(20).required(),
});
