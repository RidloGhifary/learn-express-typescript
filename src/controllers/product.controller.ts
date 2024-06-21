import { Request, Response } from "express";
import { productValidation } from "../validations/product.validation";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
  },
];

export const GetProducts = (req: Request, res: Response) => {
  const { id } = req.params;

  if (id !== undefined) {
    const filteredProduct = products.filter(
      (product: { id: number }) => product.id === Number(id)
    );

    if (!filteredProduct) {
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Product found",
      data: filteredProduct[0],
    });
  }

  console.log("first");

  res.status(200).json({
    status: true,
    message: "Product Controller",
    data: products,
  });
};

export const CreateProduct = (req: Request, res: Response) => {
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
};
