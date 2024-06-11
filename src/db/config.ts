import mongoose from "mongoose";
import { URI } from "../utils/main";
export const database_connection = async () => {
  try {
    const result = await mongoose.connect(URI);
    console.log(`connected to the database: ${result.connection.host}`);
  } catch (error) {
    console.log(`error connecting to the database: ${error}`);
    process.exit(1);
  }
};
