import Joi from "joi";

export const productValidation = (payload: { name: string; price: number }) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(65).required(),

    price: Joi.number().min(1).required(),
  });

  return schema.validate(payload);
};
