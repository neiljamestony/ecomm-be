import express from "express";
import cors from "express";
import productRoute from "./routes/product";
import { database_connection } from "./db/config";
import { findAvailablePort } from "./utils/global";
const port = 3000;

findAvailablePort(port)
  .then((port) => {
    const app = express();
    database_connection();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/auth", productRoute);
    app.listen(port, () => console.log(`server running on port: ${port}`));
  })
  .catch((err) => {
    console.log(err.message);
  });
