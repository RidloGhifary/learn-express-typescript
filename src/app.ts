import createServer from "./server";
import { logger } from "./utils/logger";

// ! CONNECT MONGODB
import "./utils/connectDb";

const app = createServer();
const port = 3200;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
