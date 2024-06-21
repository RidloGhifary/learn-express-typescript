import Products from "../models/product.model";
import { ProductProps } from "../types/product.type";
import { logger } from "../utils/logger";

export const getAllProductsFromDB = async () => {
  return await Products.find()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      logger.error(error);
    });
};

export const getProductByIdFromDB = async (id: string) => {
  return await Products.findById(id)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      logger.error(error);
    });
};

export const createProductToDB = async (data: ProductProps) => {
  return await Products.create(data);
};

export const updateProductToDB = async (id: string, data: ProductProps) => {
  return await Products.findByIdAndUpdate(id, {
    $set: { ...data, updatedAt: new Date() },
  });
};

export const deleteProductFromDB = async (id: string) => {
  return await Products.findByIdAndDelete(id);
};
