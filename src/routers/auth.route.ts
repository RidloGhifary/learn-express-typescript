import { Router } from "express";
import { LoginUser, RegisterUser } from "../controllers/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.post("/register", RegisterUser);
AuthRouter.post("/login", LoginUser);
