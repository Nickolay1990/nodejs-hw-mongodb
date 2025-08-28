import Joi from 'joi';

export const resetPasswordValidationjs = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().required(),
});
