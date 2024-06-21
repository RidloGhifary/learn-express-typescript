import { Request, Response } from "express";
import { productValidation } from "../validations/product.validation";
import {
  getAllProductsFromDB,
  getProductByIdFromDB,
} from "../service/product.service";

// const products = [
//   {
//     id: 1,
//     name: "Phone",
//     price: 100,
//     stock: 10,
//   },
//   {
//     id: 2,
//     name: "Laptop",
//     price: 200,
//     stock: 5,
//   },
//   {
//     id: 3,
//     name: "Tablet",
//     price: 300,
//     stock: 15,
//   },
// ];

export const GetProducts = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (id !== undefined) {
    const product = await getProductByIdFromDB(id);

    if (!product)
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });

    return res.status(200).json({
      status: true,
      message: "Success",
      data: product,
    });
  }

  const products = await getAllProductsFromDB();

  res.status(200).json({
    status: true,
    message: "Success",
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
