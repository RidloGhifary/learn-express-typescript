import mongoose from "mongoose";
import CONFIG from "../config/environment";
import { logger } from "./logger";

mongoose
  .connect(CONFIG.mongodb as string)
  .then(() => {
    logger.info("MongoDB connected");
  })
  .catch((error) => {
    logger.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  });
