import { Router, Request, Response } from "express";

export const ProductRouter: Router = Router();

ProductRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Product Router",
    data: [],
  });
});
