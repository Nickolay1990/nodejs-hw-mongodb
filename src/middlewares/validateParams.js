import createHttpError from 'http-errors';

export const validateParams = (schema) => {
  return async (req, res, next) => {
    try {
      const validData = await schema.validateAsync(req.query, {
        abortEarly: false,
      });

      req.validQuery = validData;

      next();
    } catch (err) {
      throw createHttpError(422, 'Invalid query data', { errors: err.details });
    }
  };
};
