import bcrypt from "bcrypt";

const HashPassword = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export default HashPassword;
