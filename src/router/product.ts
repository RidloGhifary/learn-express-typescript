import { Router, Request, Response } from "express";

export const ProductRouter: Router = Router();

ProductRouter.get("/product", (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    message: "Product Router",
    data: [],
  });
});

ProductRouter.post("/product", (req: Request, res: Response) => {
  const { name, price } = req.body;

  res.status(200).json({
    status: true,
    message: "Product created",
    data: { name, price },
  });
});
