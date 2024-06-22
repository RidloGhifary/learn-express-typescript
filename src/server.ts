import express, { Application } from "express";
import cors from "cors";

import router from "./routers";
import deserializeToken from "./middlewares/deserializeToken";

const createServer = () => {
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(deserializeToken);

  router(app);
  return app;
};

export default createServer;
