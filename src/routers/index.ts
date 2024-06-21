import { Application, Router } from "express";
import { ProductRouter } from "./product.route";

const _routes: Array<[string, Router]> = [["/api/v1", ProductRouter]];

const router = (app: Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router);
  });
};

export default router;
