import express, { Application } from "express";
import cors from "cors";

import router from "./routers";
import { logger } from "./utils/logger";

const app: Application = express();
const port: number = 3200;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

router(app);

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
