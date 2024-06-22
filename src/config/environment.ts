import dotenv from "dotenv";

dotenv.config();

const CONFIG = {
  mongodb: process.env.MONGODB_CONNECTION_STRING,
  jwtSecret: process.env.JWT_PRIVATE,
  jwtPublic: process.env.JWT_PUBLIC,
};

export default CONFIG;
