import { Request, Response } from "express";
import { createUserValidation } from "../validations/auth.validation";
import { createUserToDB, findUser } from "../service/user.service";
import HashPassword from "../utils/hashPassword";

export const RegisterUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const { error, value } = createUserValidation({
    name,
    email,
    password,
    role,
  });
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }

  try {
    const user = await findUser(email);

    if (user) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    value.password = HashPassword(password);
    await createUserToDB(value);

    res.status(201).json({
      status: true,
      message: "User created successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
