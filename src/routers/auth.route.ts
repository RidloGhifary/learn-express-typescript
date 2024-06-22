import { Router } from "express";
import {
  LoginUser,
  RegisterUser,
  RefreshSession,
} from "../controllers/auth.controller";

export const AuthRouter = Router();

AuthRouter.post("/register", RegisterUser);
AuthRouter.post("/login", LoginUser);
AuthRouter.post("/refresh", RefreshSession);
