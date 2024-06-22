import express, { Application } from "express";
import cors from "cors";

import router from "./routers";
import { logger } from "./utils/logger";
import deserializeToken from "./middlewares/deserializeToken";
// ! CONNECT MONGODB
import "./utils/connectDb";

const app: Application = express();
const port: number = 3200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(deserializeToken);

router(app);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
