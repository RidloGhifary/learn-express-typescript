import Joi from "joi";
import { UserProps } from "../types/user.type";

export const createUserValidation = (payload: UserProps) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(65).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(8).max(25).required(),
    role: Joi.string().default("regular"),
  });

  return schema.validate(payload);
};
