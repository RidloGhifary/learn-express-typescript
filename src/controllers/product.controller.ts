import { Request, Response } from "express";
import {
  productValidation,
  updateProductValidation,
} from "../validations/product.validation";
import {
  createProductToDB,
  getAllProductsFromDB,
  getProductByIdFromDB,
  updateProductToDB,
} from "../service/product.service";

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

export const CreateProduct = async (req: Request, res: Response) => {
  const { name, price, stock } = req.body;

  const { error, value } = productValidation({ name, price, stock });

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }

  try {
    const newProduct = await createProductToDB(value);
    await newProduct.save();

    res.status(201).json({
      status: true,
      message: "Product created",
      data: newProduct,
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const UpdateProduct = async (req: Request, res: Response) => {
  const {
    params: { id },
    body: { name, price, stock },
  } = req;

  const { error, value } = updateProductValidation({ name, price, stock });

  if (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }

  try {
    const updatedProduct = await updateProductToDB(id, value);

    if (!updatedProduct)
      return res.status(404).json({
        status: false,
        message: "Product not found",
      });

    res.status(200).json({
      status: true,
      message: "Product updated",
    });
  } catch (err: any) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
