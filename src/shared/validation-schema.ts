import Joi from 'joi';

export const validationSchema = Joi.object({
  DB_URL: Joi.string().required(),
  API_KEY: Joi.string().required(),
});
