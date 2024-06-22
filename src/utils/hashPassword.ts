import bcrypt from "bcrypt";

// TODO ENCODE PASSWORD
export const HashPassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

// TODO DECODE PASSWORD
export const CheckPassword = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};
