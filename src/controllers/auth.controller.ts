import { Request, Response } from "express";
import {
  createUserValidation,
  loginUserValidation,
  refreshSessionValidation,
} from "../validations/auth.validation";
import { createUserToDB, findUser } from "../service/user.service";
import { CheckPassword, HashPassword } from "../utils/hashPassword";
import { signJwt, verifyJwt } from "../utils/jwt";

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
    const user = await findUser(value.email);

    if (user) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }

    value.password = HashPassword(value.password);
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

export const LoginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { error, value } = loginUserValidation({ email, password });

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }

  try {
    const user: any = await findUser(value.email);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const isPasswordValid = CheckPassword(value.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid password",
      });
    }

    const { password: userPassword, ...others } = user._doc;

    const accessToken = signJwt(others, { expiresIn: "1d" });
    const refreshToken = signJwt(others, { expiresIn: "10d" });

    res.status(200).json({
      status: true,
      message: "Login successful",
      data: { accessToken, refreshToken },
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const RefreshSession = async (req: Request, res: Response) => {
  const { error, value } = refreshSessionValidation(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
  try {
    const { decoded } = verifyJwt(value.refreshToken);

    const user: any = await findUser(decoded.email);
    if (!user) return false;

    const { password: userPassword, ...others } = user._doc;

    const accessToken = signJwt(others, { expiresIn: "1d" });

    res.status(200).json({
      status: true,
      message: "Refresh Session successful",
      data: { accessToken },
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
