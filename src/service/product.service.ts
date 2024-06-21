import Products from "../models/product.model";
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
