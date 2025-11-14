import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // loads .env variables

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not set in your .env");
}

mongoose
  .connect(MONGODB_URI, { bufferCommands: false })
  .then(() => console.log("✅ DB connected!"))
  .catch((err) => console.error("❌ DB connection failed:", err));
