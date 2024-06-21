import { Router } from "express";
import { RegisterUser } from "../controllers/auth.controller";

export const AuthRouter: Router = Router();

AuthRouter.route("/register").post(RegisterUser);
