import { NextFunction, Request, Response } from "express";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (!user) return res.status(403).json({ message: "Not Authorized" });

  return next();
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (!user || user.role !== "admin")
    return res.status(403).json({ message: "Not Authorized" });

  return next();
};
