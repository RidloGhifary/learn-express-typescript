import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  mongodb: process.env.MONGODB_CONNECTION_STRING,
};

export default CONFIG;
