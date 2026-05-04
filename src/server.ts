import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import productRoute from "./routes/product";
import authRoute from "./routes/auth";
import cartRoute from './routes/cart';
import categoryRoute from './routes/category';
import orderRoute from './routes/order';
import { database_connection } from "./db/config";
import { findAvailablePort } from "./utils/global";

const port = 3000;

findAvailablePort(port)
  .then((port) => {
    const app = express();
    database_connection();
    app.use(cors({
      origin: "http://localhost:3000",
      credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/items", productRoute);
    app.use("/auth", authRoute);
    app.use("/cart", cartRoute);
    app.use("/category", categoryRoute);
    app.use("/order", orderRoute);
    app.listen(port, () => console.log(`server running on port: ${port}`));
  })
  .catch((err) => {
    console.log(err.message);
  });
