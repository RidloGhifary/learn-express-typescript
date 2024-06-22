import { Router } from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetProducts,
  UpdateProduct,
} from "../controllers/product.controller";
import { requireAdmin, requireUser } from "../middlewares/auth";

export const ProductRouter = Router();

ProductRouter.route("/product").get(GetProducts);
ProductRouter.get("/product/:id", GetProducts);
ProductRouter.post("/product", requireUser, CreateProduct);
ProductRouter.route("/product/:id")
  .all(requireAdmin)
  .patch(UpdateProduct)
  .delete(DeleteProduct);
