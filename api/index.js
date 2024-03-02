import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware configuration
app.use(express.json());
app.use(cors());

// Database configuration
const db_uri = process.env.MONGODB_URI;

mongoose.connect(db_uri);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Successfully Connected to MongoDB");
});

const port = 8000;

// routes

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// error middleware

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
