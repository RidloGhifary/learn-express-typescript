import { Router } from "express";
import { CreateProduct, GetProducts } from "../controllers/product.controller";

export const ProductRouter: Router = Router();

ProductRouter.route("/product").get(GetProducts).post(CreateProduct);
ProductRouter.get("/product/:id", GetProducts);
