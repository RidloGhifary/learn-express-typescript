import { Router, Request, Response } from "express";
import { productValidation } from "../validation/product.validation";

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

  const { error, value } = productValidation({ name, price });

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }

  res.status(201).json({
    status: true,
    message: "Product created",
    data: value,
  });
});
