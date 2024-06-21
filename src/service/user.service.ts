import Users from "../models/user.model";
import { UserProps } from "../types/user.type";

export const createUserToDB = async (payload: UserProps) => {
  return await Users.create(payload);
};

export const findUser = async (email: string) => {
  return await Users.findOne({ email });
};
