import express, { Application } from "express";
import router from "./router";

const app: Application = express();
const port: number = 3200;

router(app);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
