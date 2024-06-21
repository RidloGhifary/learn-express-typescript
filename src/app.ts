import express, { Application } from "express";

const app: Application = express();
const port: number = 3200;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
