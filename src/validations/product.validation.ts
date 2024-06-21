import Joi from "joi";
import { ProductProps } from "../types/product.type";

export const productValidation = (payload: ProductProps) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(65).required(),

    price: Joi.number().min(1).required(),

    stock: Joi.number().default(0),
  });

  return schema.validate(payload);
};
