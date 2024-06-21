import { Router } from "express";
import {
  CreateProduct,
  GetProducts,
  UpdateProduct,
} from "../controllers/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.route("/product").get(GetProducts).post(CreateProduct);
ProductRouter.route("/product/:id").get(GetProducts).patch(UpdateProduct);
