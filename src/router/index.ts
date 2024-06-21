import { Application, Router } from "express";
import { ProductRouter } from "./product";

const _routes: Array<[string, Router]> = [["/product", ProductRouter]];

const router = (app: Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router);
  });
};

export default router;
