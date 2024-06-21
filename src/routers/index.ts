import { Application, Router } from "express";
import { ProductRouter } from "./product.route";
import { AuthRouter } from "./auth.route";

const _routes: Array<[string, Router]> = [
  ["/api/v1", ProductRouter],
  ["/api/v1/auth", AuthRouter],
];

const router = (app: Application) => {
  _routes.forEach(([path, router]) => {
    app.use(path, router);
  });
};

export default router;
